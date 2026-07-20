export function requireAuthenticatedUser(req, res, next) {
  if (!req.session.user?.id) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  next();
}
