import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const MatchMain = styled(Box)({
  minHeight: "100vh",
  padding: "28px 24px",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
  "@media (max-width: 960px)": {
    padding: "20px",
  },
});

export const MatchShell = styled(Box)({
  width: "min(1040px, 100%)",
  minHeight: "calc(100vh - 56px)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  "@media (max-width: 960px)": {
    gap: "16px",
  },
});

export const MatchTopBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
});

export const MatchIdentity = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  color: "var(--text)",
  fontSize: "1rem",
  fontWeight: 600,
});

export const MatchSwatch = styled(Box)({
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  backgroundColor: "var(--accent-strong)",
  boxShadow: "0 0 0 4px var(--accent-soft)",
});

export const MatchIdentityText = styled(Typography)({
  fontWeight: 600,
  color: "var(--text)",
  fontFamily: "inherit",
});

export const MatchIdentityAccent = styled(Box)({
  color: "var(--accent-strong)",
});

export const MatchTimer = styled(Typography)({
  minWidth: "96px",
  padding: "8px 12px",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  backgroundColor: "var(--panel-soft)",
  color: "#fecaca",
  fontSize: "0.98rem",
  fontWeight: 700,
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
  borderColor: "rgba(248, 113, 113, 0.38)",
});

export const MatchVoiceGrid = styled(Box)({
  flex: 1,
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gridTemplateRows: "minmax(250px, 1fr) minmax(250px, 1fr)",
  gap: "16px",
  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(3, minmax(220px, auto))",
  },
});

export const MatchControls = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    "& .MuiButton-root": {
      width: "100%",
    },
  },
});

export const MatchControlSecondaryButton = styled(Button)({
  borderRadius: "20px",
  minHeight: "36px",
  padding: "8px 14px",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  color: "var(--text)",
  borderColor: "var(--border)",
  backgroundColor: "rgba(22, 32, 51, 0.74)",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.74)",
  },
});

export const MatchControlDangerButton = styled(Button)({
  borderRadius: "20px",
  minHeight: "36px",
  padding: "8px 14px",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  backgroundColor: "rgba(248, 113, 113, 0.2)",
  color: "#fecaca",
  boxShadow: "none",
  "&:hover, &:focus-visible": {
    backgroundColor: "rgba(248, 113, 113, 0.3)",
    boxShadow: "none",
  },
});
