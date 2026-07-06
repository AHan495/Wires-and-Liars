// Can create separate .env files for development/production with different base URLs
const GOOGLE_LOGIN_BASE_URL =
  import.meta.env.VITE_GOOGLE_LOGIN_BASE_URL ?? "http://localhost:3000";

const GOOGLE_LOGIN_ENDPOINT = "/auth/google";

const FAILURE_REDIRECT = import.meta.env.FRONTEND_URL ?? "http://localhost:5173";

export function getGoogleLoginUrl() {
  return GOOGLE_LOGIN_BASE_URL + GOOGLE_LOGIN_ENDPOINT;
}

export async function loginWithGoogle() {
  const loginUrl = getGoogleLoginUrl();

  try {
    const res = await fetch(loginUrl, { credentials: "include" });

    if (res.redirected) {
      window.location.assign(res.url);
      return;
    }
  } catch {
    window.location.assign(FAILURE_REDIRECT);
    return;
  }
}
