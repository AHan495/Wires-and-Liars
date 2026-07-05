const GOOGLE_LOGIN_ENDPOINT = "/auth/google";

export function getGoogleLoginUrl() {
  return GOOGLE_LOGIN_ENDPOINT;
}

export function loginWithGoogle() {
  window.location.assign(getGoogleLoginUrl());
}
