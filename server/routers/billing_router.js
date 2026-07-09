import express from "express";

export const billingRouter = express.Router();

billingRouter.post("/checkout-session", (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthenticated." });
  }

  return res.status(501).json({
    error: "Stripe checkout is not configured yet.",
  });
});
