import { CheckoutFormRoot } from "./PaymentPage.styles";

const BILLING_API_BASE_URL =
  import.meta.env.VITE_BILLING_API_BASE_URL ?? "http://localhost:3000";
const BILLING_PORTAL_SESSION_URL =
  BILLING_API_BASE_URL + "/billing/create-portal-session";

function BillingPortalForm({ children, onSubmit, returnPath }) {
  return (
    <CheckoutFormRoot
      component="form"
      method="POST"
      action={BILLING_PORTAL_SESSION_URL}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="returnPath" value={returnPath} />
      {children}
    </CheckoutFormRoot>
  );
}

export default BillingPortalForm;
