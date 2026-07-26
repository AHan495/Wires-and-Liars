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

export const MatchSwatch = styled(Box, {
  shouldForwardProp: (prop) => !["swatchColor", "swatchGlow"].includes(prop),
})(({ swatchColor, swatchGlow }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  backgroundColor: swatchColor ?? "var(--accent-strong)",
  boxShadow: `0 0 0 4px ${swatchGlow ?? "var(--accent-soft)"}`,
}));

export const MatchIdentityText = styled(Typography)({
  fontWeight: 600,
  color: "var(--text)",
  fontFamily: "inherit",
});

export const MatchIdentityAccent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accentColor",
})(({ accentColor }) => ({
  color: accentColor ?? "var(--accent-strong)",
}));

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

export const MatchStageText = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.86rem",
  fontWeight: 600,
  fontFamily: "inherit",
});

export const MatchVoiceGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isHistoryOpen",
})(({ isHistoryOpen }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gridAutoRows: isHistoryOpen ? "320px" : "420px",
  gap: "16px",
  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    gridAutoRows: isHistoryOpen ? "280px" : "360px",
  },
}));

export const MatchHistoryPanel = styled(Box)({
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel-soft)",
  overflow: "hidden",
  flex: "0 0 auto",
});

export const MatchHistoryHeader = styled(Button)({
  width: "100%",
  minHeight: "44px",
  padding: "10px 14px",
  justifyContent: "space-between",
  borderRadius: 0,
  color: "var(--text)",
  fontSize: "0.86rem",
  fontWeight: 700,
  textTransform: "none",
  transition: "none",
  "&:hover, &:focus, &:focus-visible, &:active": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

export const MatchHistoryList = styled(Box)({
  height: "220px",
  maxHeight: "220px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "12px 14px 14px",
  borderTop: "1px solid var(--border)",
});

export const MatchHistoryItem = styled(Box, {
  shouldForwardProp: (prop) => !["isActive", "activeGlow"].includes(prop),
})(({ isActive, activeGlow }) => ({
  display: "grid",
  gridTemplateColumns: "72px 1fr",
  gap: "10px",
  alignItems: "start",
  padding: isActive ? "8px 10px" : 0,
  borderRadius: isActive ? "10px" : 0,
  backgroundColor: isActive ? activeGlow : "transparent",
  color: "var(--text)",
  fontSize: "0.84rem",
}));

export const MatchHistorySpeaker = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "speakerColor",
})(({ speakerColor }) => ({
  color: speakerColor,
  fontWeight: 700,
  fontSize: "0.8rem",
  fontFamily: "inherit",
}));

export const MatchHistoryText = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  fontSize: "0.84rem",
  lineHeight: 1.45,
  fontFamily: "inherit",
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

export const MatchVotePanel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "14px",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel-soft)",
});

export const MatchVoteTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "0.94rem",
  fontWeight: 700,
  fontFamily: "inherit",
});

export const MatchVoteOptions = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "10px",
  "@media (max-width: 720px)": {
    gridTemplateColumns: "1fr",
  },
});

export const MatchVoteButton = styled(Button, {
  shouldForwardProp: (prop) => !["selected", "accentColor"].includes(prop),
})(({ selected, accentColor }) => ({
  minHeight: "42px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "0.88rem",
  fontWeight: 700,
  color: selected ? "var(--text)" : "var(--muted)",
  borderColor: selected ? accentColor : "var(--border)",
  backgroundColor: selected ? "rgba(96, 165, 250, 0.12)" : "transparent",
  "&:hover, &:focus-visible": {
    borderColor: accentColor,
    backgroundColor: "rgba(96, 165, 250, 0.12)",
  },
}));

export const MatchResultPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "humansWin",
})(({ humansWin }) => ({
  padding: "14px",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: humansWin
    ? "rgba(74, 222, 128, 0.12)"
    : "rgba(248, 113, 113, 0.12)",
  borderColor: humansWin
    ? "rgba(74, 222, 128, 0.36)"
    : "rgba(248, 113, 113, 0.36)",
}));

export const MatchResultText = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "0.96rem",
  fontWeight: 700,
  fontFamily: "inherit",
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
