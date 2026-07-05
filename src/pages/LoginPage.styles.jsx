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
  width: "min(920px, 100%)",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 340px",
  gap: "18px",
  alignItems: "stretch",
  "@media (max-width: 820px)": {
    gridTemplateColumns: "1fr",
  },
});

const BasePanel = styled(Card)({
  border: "1px solid var(--border)",
  borderRadius: "16px",
  background: "var(--panel)",
  color: "var(--text)",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
});

export const HeroPanel = styled(BasePanel)({
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "28px",
  background:
    "linear-gradient(145deg, rgba(11, 17, 32, 0.98), rgba(16, 24, 39, 0.9))",
  "@media (max-width: 820px)": {
    minHeight: "auto",
  },
});

export const LoginPanel = styled(BasePanel)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "24px",
  padding: "22px",
});

export const BrandMark = styled(Box)({
  width: "44px",
  height: "44px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  border: "1px solid rgba(96, 165, 250, 0.34)",
  background: "rgba(37, 99, 235, 0.16)",
  color: "var(--accent-strong)",
});

export const Eyebrow = styled(Typography)({
  color: "var(--accent-strong)",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: "uppercase",
});

export const LoginTitle = styled(Typography)({
  color: "var(--text)",
  fontSize: "clamp(2rem, 5vw, 4rem)",
  lineHeight: 0.95,
  fontWeight: 800,
  letterSpacing: 0,
});

export const HeroText = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.94rem",
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
