import { Stack } from "@mui/material";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { loginWithGoogle } from "../../services/auth-api";
import {
  AuthHeading,
  AuthNoteRoot,
  AuthNoteText,
  BrandMark,
  Eyebrow,
  GoogleButton,
  GoogleButtonLabel,
  GoogleGlyph,
  HeroPanel,
  HeroText,
  LoginTitle,
  LoginMain,
  LoginPanel,
  LoginShell,
} from "./LoginPage.styles";

function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleGoogleLogin() {
    setIsRedirecting(true);
    await loginWithGoogle();
    setIsRedirecting(false);
  }

  return (
    <LoginMain>
      <LoginShell>
        <HeroPanel>
          <Stack spacing={3}>
            <BrandMark aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={2.2} />
            </BrandMark>
            <Stack spacing={1.5}>
              <Eyebrow>Wires and Liars</Eyebrow>
              <LoginTitle component="h1">
                Read the room before it reads you.
              </LoginTitle>
            </Stack>
          </Stack>

          <HeroText>
            Sign in to host rooms, join live games, and track your games.
          </HeroText>
        </HeroPanel>

        <LoginPanel>
          <Stack spacing={1}>
            <AuthHeading component="h2" variant="h5">
              Sign in
            </AuthHeading>
          </Stack>

          <Stack spacing={2}>
            <GoogleButton
              type="button"
              variant="contained"
              onClick={handleGoogleLogin}
              disabled={isRedirecting}
              aria-label="Sign in with Google"
            >
              <GoogleButtonLabel component="span">
                <GoogleGlyph aria-hidden="true">G</GoogleGlyph>
                {isRedirecting ? "Redirecting..." : "Continue with Google"}
              </GoogleButtonLabel>
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </GoogleButton>

            <AuthNoteRoot>
              <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" />
              <AuthNoteText component="span">
                Authentication is handled through Google.
              </AuthNoteText>
            </AuthNoteRoot>
          </Stack>
        </LoginPanel>
      </LoginShell>
    </LoginMain>
  );
}

export default LoginPage;
