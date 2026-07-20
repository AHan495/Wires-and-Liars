const BILLING_API_BASE_URL =
  import.meta.env.VITE_BILLING_API_BASE_URL ?? "http://localhost:3000";

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
