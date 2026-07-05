import { Box, Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginMain = styled(Box)({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "24px",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
});

export const LoginShell = styled(Box)({
  width: "min(380px, 100%)",
});

export const LoginPanel = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "24px",
  padding: "22px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  background: "var(--panel)",
  color: "var(--text)",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
});

export const AuthHeading = styled(Typography)({
  color: "var(--text)",
  fontWeight: 800,
});

export const GoogleButton = styled(Button)({
  width: "100%",
  minHeight: "46px",
  justifyContent: "space-between",
  borderRadius: "20px",
  padding: "10px 14px",
  color: "#ffffff",
  background: "rgba(37, 99, 235, 0.72)",
  border: "1px solid rgba(96, 165, 250, 0.32)",
  boxShadow: "none",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "none",
  "&:hover, &:focus-visible": {
    background: "rgba(37, 99, 235, 0.82)",
    borderColor: "var(--border-strong)",
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.72)",
    background: "rgba(37, 99, 235, 0.42)",
  },
});

export const GoogleButtonLabel = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
});

export const GoogleGlyph = styled(Box)({
  width: "22px",
  height: "22px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "#ffffff",
  color: "#1f2937",
  fontSize: "0.9rem",
  fontWeight: 800,
  lineHeight: 1,
});

export const AuthNoteRoot = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  padding: "12px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  background: "var(--panel-soft)",
  color: "var(--muted)",
  fontSize: "0.82rem",
  "& svg": {
    flex: "0 0 auto",
    marginTop: "2px",
    color: "var(--accent-strong)",
  },
});

export const AuthNoteText = styled(Typography)({
  color: "inherit",
  fontSize: "inherit",
});
