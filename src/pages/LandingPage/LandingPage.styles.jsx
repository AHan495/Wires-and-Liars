import { Box, Card, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LandingMain = styled(Box)(() => ({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "28px",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
}));

export const LandingShell = styled(Box)(() => ({
  width: "min(1100px, 100%)",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  alignItems: "start",
}));

const BaseCard = styled(Card)(() => ({
  border: "1px solid var(--border)",
  borderRadius: "14px",
  background: "var(--panel)",
  color: "var(--text)",
  boxShadow: "var(--shadow)",
  padding: "22px",
}));

export const HeroCard = styled(BaseCard)(() => ({
  minHeight: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

export const CTAButton = styled(Button)(() => ({
  width: "fit-content",
  minHeight: "46px",
  borderRadius: "18px",
  padding: "10px 18px",
  color: "#fff",
  background: "rgba(37, 99, 235, 0.82)",
  border: "1px solid rgba(96, 165, 250, 0.32)",
  fontWeight: 800,
  textTransform: "none",
  "&:hover": {
    background: "rgba(37, 99, 235, 0.9)",
  },
}));

export const BrandEyebrow = styled(Typography)(() => ({
  color: "var(--accent-strong)",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: "uppercase",
}));

export const HeroTitle = styled(Typography)(() => ({
  color: "var(--text)",
  fontSize: "clamp(1.6rem, 4vw, 3rem)",
  lineHeight: 1.02,
  fontWeight: 800,
}));

export const HeroSubtitle = styled(Typography)(() => ({
  color: "var(--muted)",
  fontSize: "0.95rem",
}));

export const FeaturesGrid = styled(Box)(() => ({
  display: "grid",
  gap: "18px",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  alignItems: "stretch",
  "@media (max-width: 880px)": {
    gridTemplateColumns: "1fr",
  },
}));

export const FeatureCard = styled(BaseCard)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "18px",
  minWidth: 0,
}));

export const FeatureIcon = styled(Box)(() => ({
  width: "42px",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "rgba(99,102,241,0.06)",
  color: "var(--accent-strong)",
}));
