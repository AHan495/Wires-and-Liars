import * as Sentry from "@sentry/node";
import { Op } from "sequelize";
import { User } from "../models/user.js";
import { getSubscriptionAccessUntil } from "../utils/subscription.js";

// Adapted from https://docs.stripe.com/checkout/fulfillment?lang=node
export async function subscribeUser(stripe, sessionId) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  Sentry.logger.info("Stripe checkout session retrieved.", {
    sessionId: checkoutSession.id,
    customerId: checkoutSession.customer,
    userId: checkoutSession.client_reference_id,
    paymentStatus: checkoutSession.payment_status,
  });

  const userId = checkoutSession.client_reference_id;
  const subscription = checkoutSession.subscription;

  if (checkoutSession.payment_status !== "paid" || !userId || !subscription) {
    return;
  }

  await User.update(
    {
      customerId: checkoutSession.customer,
      subscriptionId: subscription.id,
      accessUntil: getSubscriptionAccessUntil(subscription),
    },
    { where: { id: userId } },
  );
}

export async function syncSubscription(subscription) {
  await User.update(
    {
      customerId: subscription.customer,
      subscriptionId: subscription.id,
      accessUntil: getSubscriptionAccessUntil(subscription),
    },
    {
      where: {
        [Op.or]: [
          { subscriptionId: subscription.id },
          // Fallback for the case where subscriptionId is null
          {
            customerId: subscription.customer,
            subscriptionId: null, // Explicit check for safety
          },
        ],
      },
    },
  );
}

export async function unsubscribeUser(subscription) {
  await User.update(
    {
      subscriptionId: null,
      accessUntil: null,
    },
    { where: { subscriptionId: subscription.id } },
  );
}
