// Router for Stripe billing
// Adapted from quickstart in Stripe docs: https://docs.stripe.com/billing/quickstart?accounts-namespace=v1

import express from "express";
import Stripe from "stripe";
import { isAuthenticated } from "../middleware/auth.js";
import { User } from "../models/user.js";
import {
  subscribeUser,
  syncSubscription,
  unsubscribeUser,
} from "../services/billing_service.js";

export const billingRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookEndpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET; // TODO: debug 400 errors despite using correct secret

const FRONTEND_BASE_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// The Wires and Liars product in Stripe is assigned a price, which has a lookup key we can assign through the Stripe
// account
// We pass this lookup key for API calls that need to find the price (e.g., creating a checkout session)
// Lookup keys let us change prices through the Stripe account without needing any code changes
const SUBSCRIPTION_PRICE_LOOKUP_KEY = "monthly_subscription";

billingRouter.post(
  "/create-checkout-session",
  isAuthenticated,
  async (req, res) => {
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Retrieve price object by lookup key
    const prices = await stripe.prices.list({
      lookup_keys: [SUBSCRIPTION_PRICE_LOOKUP_KEY],
      limit: 1,
    });

    if (!prices.data.length) {
      return res.status(404).json({ error: "No Stripe price found." });
    }

    const price = prices.data[0];
    // Create checkout session for the price found
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: user.customerId ?? undefined, // ID of existing customer (if there is one)
      customer_email: user.customerId ? undefined : user.email, // Email used to create new Customer
      // When customer ID is provided, Stripe uses existing customer; when email is provided, Stripe creates new
      // customer using email
      client_reference_id: String(user.id), // Unique string to reference the Stripe Checkout Session
      // {CHECKOUT_SESSION_ID} is a placeholder populated by Stripe when it redirects to success_url
      success_url: `${FRONTEND_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log(session);

    // Checkout session created; now redirect to Stripe-hosted payment page
    res.redirect(303, session.url);
  },
);

billingRouter.get("/subscription-status", isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.json({
    accessUntil: user.accessUntil,
  });
});

billingRouter.post(
  "/create-portal-session",
  isAuthenticated,
  async (req, res) => {
    const user = await User.findByPk(req.session.userId);

    if (!user?.customerId) {
      return res.status(404).json({ error: "Stripe customer not found." });
    }

    const { returnPath } = req.body;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: `${FRONTEND_BASE_URL}${returnPath}`, // Redirect to this once done managing billing
    });

    res.redirect(303, portalSession.url);
  },
);

billingRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        webhookEndpointSecret,
      );
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const checkoutSession = event.data.object;
      await subscribeUser(stripe, checkoutSession.id);
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated"
    ) {
      const subscription = event.data.object;
      await syncSubscription(subscription);
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      await unsubscribeUser(subscription);
    }

    res.status(200).end();
  },
);
