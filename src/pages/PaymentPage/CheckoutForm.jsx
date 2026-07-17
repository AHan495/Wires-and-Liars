import { CheckoutFormRoot } from "./PaymentPage.styles";

const BILLING_API_BASE_URL =
  import.meta.env.VITE_BILLING_API_BASE_URL ?? "http://localhost:3000";
const CHECKOUT_SESSION_URL =
  BILLING_API_BASE_URL + "/billing/create-checkout-session";

function CheckoutForm({ children, onSubmit }) {
  // This is the pattern used in the Stripe quickstart guide; this approach allows us to checkout without needing a
  // frontend API service specifically for fetching /create-checkout-session
  return (
    <CheckoutFormRoot
      component="form"
      method="POST"
      action={CHECKOUT_SESSION_URL}
      onSubmit={onSubmit}
    >
      {children}
    </CheckoutFormRoot>
  );
}

export default CheckoutForm;
