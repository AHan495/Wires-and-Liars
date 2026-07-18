import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const PaymentMain = styled(Box)({
  minHeight: "100vh",
  padding: "28px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
  "@media (max-width: 960px)": {
    padding: "20px",
  },
});

export const PaymentShell = styled(Box)({
  width: "min(600px, 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "22px",
  padding: "24px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  background:
    "linear-gradient(145deg, rgba(11, 17, 32, 0.98), rgba(16, 24, 39, 0.92))",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
  "@media (max-width: 880px)": {
    padding: "20px",
  },
});

export const SummaryPanel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const CheckoutFormRoot = styled(Box)({
  width: "100%",
});

export const PaymentHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "14px",
});

export const PaymentEyebrow = styled(Typography)({
  margin: 0,
  color: "var(--accent-strong)",
  fontSize: "0.76rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const PaymentTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "2.25rem",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: 0,
});

export const PaymentDescription = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  fontSize: "0.96rem",
});

export const SummaryText = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  fontSize: "0.84rem",
});

export const PriceBlock = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
  padding: "18px",
  border: "1px solid rgba(96, 165, 250, 0.32)",
  borderRadius: "14px",
  backgroundColor: "var(--panel-strong)",
});

export const PriceAmount = styled(Typography)({
  color: "var(--text)",
  fontSize: "2.4rem",
  fontWeight: 800,
  lineHeight: 1,
});

export const PriceInterval = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.86rem",
});

export const CheckoutButton = styled(Button)({
  width: "100%",
  minHeight: "44px",
  borderRadius: "20px",
  padding: "10px 14px",
  backgroundColor: "rgba(37, 99, 235, 0.72)",
  color: "#ffffff",
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none",
  "&:hover, &:focus-visible": {
    backgroundColor: "rgba(37, 99, 235, 0.82)",
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.72)",
    backgroundColor: "rgba(37, 99, 235, 0.42)",
  },
});

export const SecureNote = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  padding: "12px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  backgroundColor: "var(--panel-soft)",
  color: "var(--muted)",
  fontSize: "0.82rem",
  "& svg": {
    flex: "0 0 auto",
    marginTop: "2px",
    color: "var(--accent-strong)",
  },
});
