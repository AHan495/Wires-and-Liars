// Can create separate .env files for development/production with different base URLs
const GOOGLE_LOGIN_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

const GOOGLE_LOGIN_ENDPOINT = "/auth/google";

export function getGoogleLoginUrl() {
  return GOOGLE_LOGIN_BASE_URL + GOOGLE_LOGIN_ENDPOINT;
}

// Google hates fetch for some reason, so just raw redirect to localhost:3000/auth/google
export function loginWithGoogle() {
  const loginUrl = getGoogleLoginUrl();
  window.location.assign(loginUrl);
}

export function getCurrentUser() {
  return fetch(`${GOOGLE_LOGIN_BASE_URL}/auth/me`, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function logout() {
  return fetch(`${GOOGLE_LOGIN_BASE_URL}/auth/logout`, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}
