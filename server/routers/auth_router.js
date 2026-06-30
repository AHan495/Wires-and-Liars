import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

// Need to run dotenv config here aswell, or else process.env will be undefined
dotenv.config();

export const authRouter = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/callback"
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
  const { email } = verifiedToken.getPayload();
  req.session.user = { email };
  res.redirect("/");
});

// Logs the user out via destroying session
authRouter.get("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});