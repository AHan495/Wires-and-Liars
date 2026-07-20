import { useEffect } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  SUBSCRIPTION_CONFIRMATION_STATUS,
  useSubscriptionConfirmation,
} from "../../hooks/useSubscriptionConfirmation";
import {
  CheckoutButton,
  PaymentDescription,
  PaymentEyebrow,
  PaymentHeader,
  PaymentMain,
  PaymentShell,
  PaymentTitle,
  SummaryPanel,
} from "./PaymentPage.styles";

function PaymentTransitionPage() {
  const navigate = useNavigate();
  const { refreshCurrentUser } = useAuth();
  const confirmationStatus = useSubscriptionConfirmation();

  useEffect(() => {
    let isMounted = true;

    async function redirectAfterConfirmation() {
      await refreshCurrentUser();

      if (isMounted) {
        navigate("/lobby", { replace: true });
      }
    }

    if (confirmationStatus === SUBSCRIPTION_CONFIRMATION_STATUS.CONFIRMED) {
      redirectAfterConfirmation();
    }

    return () => {
      isMounted = false;
    };
  }, [confirmationStatus, navigate, refreshCurrentUser]);

  const isChecking =
    confirmationStatus === SUBSCRIPTION_CONFIRMATION_STATUS.CHECKING;
  const isConfirmed =
    confirmationStatus === SUBSCRIPTION_CONFIRMATION_STATUS.CONFIRMED;
  const isFailed =
    confirmationStatus === SUBSCRIPTION_CONFIRMATION_STATUS.FAILED;

  return (
    <PaymentMain component="main">
      <PaymentShell component="section" aria-label="Payment confirmation">
        <PaymentHeader>
          <PaymentEyebrow component="p">
            {isChecking ? "Confirming payment" : "Payment not confirmed"}
          </PaymentEyebrow>
          <PaymentTitle component="h1">
            {isChecking ? "Setting up your subscription" : "Still processing"}
          </PaymentTitle>
          <PaymentDescription component="p">
            {isChecking
              ? "Confirming your subscription status..."
              : "We could not confirm an active subscription yet. Try again later or return to checkout."}
          </PaymentDescription>
        </PaymentHeader>

        <SummaryPanel aria-label="Payment status">
          {isFailed ? (
            <CheckoutButton
              type="button"
              variant="contained"
              onClick={() => navigate("/payment")}
            >
              Back to payment
            </CheckoutButton>
          ) : (
            <CheckoutButton
              type="button"
              variant="contained"
              disabled
              startIcon={
                isConfirmed ? (
                  <CheckCircle2 size={17} strokeWidth={2.2} />
                ) : (
                  <LoaderCircle size={17} strokeWidth={2.2} />
                )
              }
            >
              {isConfirmed ? "Confirmed" : "Confirming..."}
            </CheckoutButton>
          )}
        </SummaryPanel>
      </PaymentShell>
    </PaymentMain>
  );
}

export default PaymentTransitionPage;
