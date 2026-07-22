const BILLING_API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

// TODO(important): set subscription status in Redis and repeatedly poll that instead of the DB (which this fetch does)
export async function getSubscriptionStatus() {
  const response = await fetch(
    `${BILLING_API_BASE_URL}/billing/subscription-status`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to fetch subscription status.");
  }

  return response.json();
}
