import { useEffect, useState } from "react";
import { getSubscriptionStatus } from "../services/billing-api";

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 15;

export const SUBSCRIPTION_CONFIRMATION_STATUS = Object.freeze({
  CHECKING: "checking",
  CONFIRMED: "confirmed",
  FAILED: "failed",
});

export function useSubscriptionConfirmation() {
  const [status, setStatus] = useState(
    SUBSCRIPTION_CONFIRMATION_STATUS.CHECKING,
  );

  useEffect(() => {
    let isMounted = true; // Hacky fix
    let timeoutId;

    // Poll subscription status from backend until subscription is confirmed or max # of attempts are reached
    async function checkSubscriptionStatus(attempts = 0) {
      try {
        const subscriptionStatus = await getSubscriptionStatus();

        if (!isMounted) {
          return;
        }

        if (subscriptionStatus.hasActiveSubscription) {
          setStatus(SUBSCRIPTION_CONFIRMATION_STATUS.CONFIRMED);
          return;
        }

        const nextAttempts = attempts + 1;

        if (nextAttempts >= MAX_POLL_ATTEMPTS) {
          setStatus(SUBSCRIPTION_CONFIRMATION_STATUS.FAILED);
          return;
        }

        timeoutId = window.setTimeout(
          () => checkSubscriptionStatus(nextAttempts),
          POLL_INTERVAL_MS,
        );
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error(error);
        setStatus(SUBSCRIPTION_CONFIRMATION_STATUS.FAILED);
      }
    }

    checkSubscriptionStatus();

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return status;
}
