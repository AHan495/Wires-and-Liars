import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import CheckoutForm from "./CheckoutForm";
import {
  CheckoutButton,
  PaymentDescription,
  PaymentEyebrow,
  PaymentHeader,
  PaymentMain,
  PaymentShell,
  PaymentTitle,
  PriceAmount,
  PriceBlock,
  PriceInterval,
  SecureNote,
  SummaryPanel,
  SummaryText,
} from "./PaymentPage.styles";

function PaymentPage() {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  return (
    <PaymentMain component="main">
      <PaymentShell component="section" aria-label="Payment checkout">
        <PaymentHeader>
          <PaymentEyebrow component="p">
            Wires and Liars subscription
          </PaymentEyebrow>
          <PaymentTitle component="h1">Subscribe to play</PaymentTitle>
          <PaymentDescription component="p">
            A monthly subscription is required to play.
          </PaymentDescription>
        </PaymentHeader>

        <SummaryPanel aria-label="Order summary">
          <PriceBlock>
            <PriceAmount component="strong">$5</PriceAmount>
            <PriceInterval component="span">per month</PriceInterval>
          </PriceBlock>

          <CheckoutForm onSubmit={() => setIsCheckoutLoading(true)}>
            <CheckoutButton
              type="submit"
              variant="contained"
              disabled={isCheckoutLoading}
              startIcon={<CheckCircle2 size={17} strokeWidth={2.2} />}
            >
              {isCheckoutLoading
                ? "Starting checkout..."
                : "Continue to Stripe"}
            </CheckoutButton>
          </CheckoutForm>

          <SecureNote>
            <Lock size={16} strokeWidth={2.2} aria-hidden="true" />
            <SummaryText component="span">
              Stripe processes all payment details.
            </SummaryText>
          </SecureNote>
        </SummaryPanel>
      </PaymentShell>
    </PaymentMain>
  );
}

export default PaymentPage;
