import { Stack } from "@mui/material";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { loginWithGoogle } from "../services/authApi";
import {
  AuthHeading,
  AuthNoteRoot,
  AuthNoteText,
  GoogleButton,
  GoogleButtonLabel,
  GoogleGlyph,
  LoginMain,
  LoginPanel,
  LoginShell,
} from "./LoginPage.styles";

function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  function handleGoogleLogin() {
    setIsRedirecting(true);
    loginWithGoogle();
  }

  return (
    <LoginMain>
      <LoginShell>
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
