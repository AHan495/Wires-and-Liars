import { useState } from "react";
import { createCheckoutSession } from "../services/billing-api";

const CHECKOUT_STATE = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

export function useCheckoutRedirect() {
  const [checkoutState, setCheckoutState] = useState(CHECKOUT_STATE.IDLE);

  async function startCheckout() {
    setCheckoutState(CHECKOUT_STATE.LOADING);

    try {
      const { url } = await createCheckoutSession();

      if (!url) {
        throw new Error("Checkout URL missing.");
      }

      window.location.assign(url);
    } catch {
      setCheckoutState(CHECKOUT_STATE.ERROR);
    }
  }

  return {
    hasCheckoutError: checkoutState === CHECKOUT_STATE.ERROR,
    isCheckoutLoading: checkoutState === CHECKOUT_STATE.LOADING,
    startCheckout,
  };
}
