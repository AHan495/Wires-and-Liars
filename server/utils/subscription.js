// For Stripe subscription object
export function getSubscriptionAccessUntil(subscription) {
  // First (only) line item is the subscription to our site
  const periodEnd = subscription?.items?.data?.[0]?.current_period_end;

  if (!periodEnd) {
    return null;
  }

  // Stripe stores Unix timestamp, which is in seconds; Date constructor expects milliseconds
  return new Date(periodEnd * 1000);
}

export function hasSubscriptionAccess(accessUntil) {
  return accessUntil !== null && new Date(accessUntil) > new Date();
}
