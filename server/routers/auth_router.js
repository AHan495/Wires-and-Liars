import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.js";
import { hasSubscriptionAccess } from "../utils/subscription.js";

// Need to run dotenv config here aswell, or else process.env will be undefined
dotenv.config();

export const authRouter = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.BACKEND_URL + "/auth/callback",
);

// Generate a URL to redirect the user to where they will authorize with Google
authRouter.get("/google", (req, res) => {
  const url = client.generateAuthUrl({ scope: ["email"] });
  res.redirect(url);
});

// Once user authorizes with google, they get redirected here where we grab the token using the code
// then verify the token, then set their session and redirect to home
authRouter.get("/callback", async (req, res) => {
  const { tokens } = await client.getToken(req.query.code);
  const verifiedToken = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  // sub is a unique among all Google accounts and should be used as the unique user identifier
  // https://docs.cloud.google.com/nodejs/docs/reference/google-auth-library/latest/google-auth-library/tokenpayload#google_auth_library_TokenPayload_sub_member
  const { sub, email } = verifiedToken.getPayload();
  req.session.userId = sub;
  req.session.email = email; // TODO: may be better to only store userId in session as a Google user's email can change

  const [user] = await User.findOrCreate({
    where: { id: sub },
    defaults: { email },
  });

  // Email can change for a specific user
  if (user.email !== email) {
    user.email = email;
    await user.save();
  }

  const redirectPath = hasSubscriptionAccess(user.accessUntil)
    ? "/lobby"
    : "/payment";

  res.redirect(`${process.env.FRONTEND_URL}${redirectPath}`);
});

// Logs the user out via destroying session
authRouter.get("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

authRouter.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not Authenticated" });
  }

  const user = await User.findByPk(req.session.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.json({
    userId: req.session.userId,
    email: user.email,
    accessUntil: user.accessUntil,
    hasSubscriptionAccess: hasSubscriptionAccess(user.accessUntil),
  });
});
