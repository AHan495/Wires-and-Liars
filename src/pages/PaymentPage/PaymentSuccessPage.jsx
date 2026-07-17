import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <PaymentMain component="main">
      <PaymentShell component="section" aria-label="Payment success">
        <PaymentHeader>
          <PaymentEyebrow component="p">Payment complete</PaymentEyebrow>
          <PaymentTitle component="h1">Subscription active</PaymentTitle>
          <PaymentDescription component="p">
            You are now subscribed! You can now enter the lobby and join a
            match.
          </PaymentDescription>
        </PaymentHeader>

        <SummaryPanel aria-label="Payment status">
          <CheckoutButton
            type="button"
            variant="contained"
            onClick={() => navigate("/lobby")}
            endIcon={<ArrowRight size={17} strokeWidth={2.2} />}
          >
            Continue to lobby
          </CheckoutButton>
        </SummaryPanel>
      </PaymentShell>
    </PaymentMain>
  );
}

export default PaymentSuccessPage;
