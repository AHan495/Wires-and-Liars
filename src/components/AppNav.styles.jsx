import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const AppNavRoot = styled(Box)({
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "12px 14px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  backgroundColor: "rgba(11, 17, 32, 0.86)",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.22)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
  "& .MuiButton-root": {
    minHeight: "36px",
    borderRadius: "999px",
    padding: "7px 12px",
    textTransform: "none",
    fontSize: "0.82rem",
    fontWeight: 700,
  },
  "& .MuiButton-contained": {
    color: "#ffffff",
    backgroundColor: "rgba(37, 99, 235, 0.84)",
    boxShadow: "none",
  },
  "& .MuiButton-outlined": {
    color: "var(--text)",
    borderColor: "var(--border)",
    backgroundColor: "rgba(22, 32, 51, 0.62)",
  },
  "& .MuiButton-outlined:hover, & .MuiButton-outlined:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.78)",
  },
  "@media (max-width: 720px)": {
    alignItems: "stretch",
    flexDirection: "column",
  },
});

export const AppNavTitle = styled(Typography)({
  color: "var(--text)",
  fontSize: "1rem",
  fontWeight: 800,
  letterSpacing: 0,
  whiteSpace: "nowrap",
});

export const AppNavActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
  flexWrap: "wrap",
  "@media (max-width: 720px)": {
    justifyContent: "stretch",
    "& .MuiButton-root": {
      flex: "1 1 110px",
    },
  },
});
