import { ACTIVE_SUBSCRIPTION_STATUS } from "./constants.js";

// For Stripe subscription object
export function getStripeSubscriptionPeriodEndDate(subscription) {
  // First (only) line item is the subscription to our site
  const periodEnd = subscription?.items?.data?.[0]?.current_period_end;

  if (!periodEnd) {
    return null;
  }

  // Stripe stores Unix timestamp, which is in seconds; Date constructor expects milliseconds
  return new Date(periodEnd * 1000);
}

// For subscription object we return
export function isAppSubscriptionEntitled(subscription, now = new Date()) {
  if (
    subscription?.status !== ACTIVE_SUBSCRIPTION_STATUS ||
    !subscription?.currentPeriodEnd
  ) {
    return false;
  }

  return new Date(subscription.currentPeriodEnd) > now;
}
