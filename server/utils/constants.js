// Stripe Subscription statuses from https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses
// Excluding the ones related to trialing as this does not apply to our site
export const SUBSCRIPTION_STATUSES = Object.freeze([
  "inactive",
  "incomplete",
  "incomplete_expired",
  "active",
  "past_due",
  "canceled",
  "unpaid",
]);

export const ACTIVE_SUBSCRIPTION_STATUS = "active";
