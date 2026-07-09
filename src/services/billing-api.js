const BILLING_API_BASE_URL =
  import.meta.env.VITE_BILLING_API_BASE_URL ?? "http://localhost:3000";

const CHECKOUT_SESSION_ENDPOINT = "/billing/checkout-session";

export async function createCheckoutSession() {
  const response = await fetch(
    BILLING_API_BASE_URL + CHECKOUT_SESSION_ENDPOINT,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to start checkout.");
  }

  return response.json();
}
