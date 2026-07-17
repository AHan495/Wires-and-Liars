// Router for Stripe billing
// Adapted from quickstart in Stripe docs: https://docs.stripe.com/billing/quickstart?accounts-namespace=v1

import express from "express";
import Stripe from "stripe";

export const billingRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const REDIRECT_BASE_URL = "http://localhost:5173";
// The Wires and Liars product in Stripe is assigned a price, which has a lookup key we can assign through the Stripe
// account
// We pass this lookup key for API calls that need to find the price (e.g., creating a checkout session)
// Lookup keys let us change prices through the Stripe account without needing any code changes
const SUBSCRIPTION_PRICE_LOOKUP_KEY = "monthly_subscription";

billingRouter.post("/create-checkout-session", async (req, res) => {
  // TODO: check user is authenticated, maybe also pass their email/user ID
  const prices = await stripe.prices.list({
    lookup_keys: [SUBSCRIPTION_PRICE_LOOKUP_KEY],
    expand: ["data.product"],
  });

  if (!prices.data.length) {
    return res.status(404).json({ error: "No Stripe price found." });
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${REDIRECT_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  console.log(session);

  // res.json({ url: session.url });
  res.redirect(303, session.url);
});
