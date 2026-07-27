// For Stripe subscription object
export function getSubscriptionAccessUntil(subscription) {
  if (!subscription || !hasActiveSubscriptionStatus(subscription.status)) {
    return null;
  }

  // First (only) line item is the subscription to our site
  const periodEnd =
    subscription.current_period_end ??
    subscription.items?.data?.[0]?.current_period_end;

  if (!periodEnd) {
    return null;
  }

  // Stripe stores Unix timestamp, which is in seconds; Date constructor expects milliseconds
  return new Date(periodEnd * 1000);
}

export function hasSubscriptionAccess(accessUntil) {
  return accessUntil !== null && new Date(accessUntil) > new Date();
}

function hasActiveSubscriptionStatus(status) {
  return status === "active";
}
