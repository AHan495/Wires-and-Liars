import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const ProfileMain = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px 24px",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
  "@media (max-width: 960px)": {
    padding: "20px",
  },
});

export const ProfileShell = styled(Box)({
  width: "min(1040px, 100%)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const ProfileHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "16px",
  padding: "18px 2px 4px",
  "@media (max-width: 720px)": {
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

export const ProfileTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "1.8rem",
  fontWeight: 800,
  lineHeight: 1.15,
});

export const ProfileEmail = styled(Typography)({
  margin: "6px 0 0",
  color: "var(--muted)",
  fontSize: "0.92rem",
});

export const ProfileActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "10px",
  flexWrap: "wrap",
  "& form": {
    width: "auto",
  },
  "@media (max-width: 720px)": {
    justifyContent: "flex-start",
  },
});

export const HistoryCount = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.84rem",
  fontWeight: 700,
});

export const ProfileBillingButton = styled(Button)({
  minHeight: "34px",
  padding: "6px 12px",
  borderRadius: "999px",
  color: "var(--text)",
  borderColor: "var(--border)",
  backgroundColor: "rgba(22, 32, 51, 0.7)",
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "none",
  whiteSpace: "nowrap",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.86)",
  },
  "&.Mui-disabled": {
    color: "rgba(148, 163, 184, 0.56)",
    borderColor: "rgba(148, 163, 184, 0.22)",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
});

export const HistoryList = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
});

export const HistoryPagination = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "4px 2px 0",
  "@media (max-width: 560px)": {
    alignItems: "stretch",
    flexDirection: "column",
  },
});

export const PaginationInfo = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.82rem",
  fontWeight: 700,
});

export const PaginationActions = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
});

export const PaginationButton = styled(Button)({
  minHeight: "32px",
  padding: "6px 11px",
  borderRadius: "999px",
  color: "var(--text)",
  borderColor: "var(--border)",
  backgroundColor: "rgba(22, 32, 51, 0.7)",
  fontSize: "0.78rem",
  fontWeight: 700,
  textTransform: "none",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.86)",
  },
  "&.Mui-disabled": {
    color: "rgba(148, 163, 184, 0.56)",
    borderColor: "rgba(148, 163, 184, 0.22)",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
});

export const HistoryCard = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
  padding: "10px 12px",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel)",
  boxShadow: "var(--shadow)",
  "@media (max-width: 820px)": {
    gridTemplateColumns: "1fr",
  },
});

export const HistoryMeta = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
  "@media (max-width: 820px)": {
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});

export const HistoryRoomName = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "0.95rem",
  fontWeight: 800,
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: "150px",
  flex: "1 1 180px",
});

export const HistoryText = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  fontSize: "0.8rem",
  lineHeight: 1.25,
  whiteSpace: "nowrap",
});

export const HistoryToggle = styled(Button)({
  width: "max-content",
  minHeight: "30px",
  padding: "5px 10px",
  borderRadius: "999px",
  gap: "4px",
  color: "var(--text)",
  borderColor: "var(--border)",
  backgroundColor: "rgba(22, 32, 51, 0.7)",
  fontSize: "0.78rem",
  fontWeight: 700,
  textTransform: "none",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.86)",
  },
  "& .MuiButton-endIcon": {
    marginLeft: "2px",
  },
});

export const ResultBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "humansWin",
})(({ humansWin }) => ({
  width: "max-content",
  padding: "4px 8px",
  borderRadius: "999px",
  color: humansWin ? "#bbf7d0" : "#fecaca",
  backgroundColor: humansWin
    ? "rgba(74, 222, 128, 0.14)"
    : "rgba(248, 113, 113, 0.14)",
  border: `1px solid ${
    humansWin ? "rgba(74, 222, 128, 0.32)" : "rgba(248, 113, 113, 0.32)"
  }`,
  fontSize: "0.78rem",
  fontWeight: 800,
  whiteSpace: "nowrap",
}));

export const TranscriptPanel = styled(Box)({
  maxHeight: "230px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "10px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  backgroundColor: "var(--panel-soft)",
});

export const TranscriptLine = styled(Box)({
  display: "grid",
  gridTemplateColumns: "74px 1fr",
  gap: "10px",
  alignItems: "start",
});

export const TranscriptSpeaker = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "speakerColor",
})(({ speakerColor }) => ({
  color: speakerColor ?? "var(--accent-strong)",
  fontSize: "0.78rem",
  fontWeight: 800,
}));

export const TranscriptMessage = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  fontSize: "0.84rem",
  lineHeight: 1.45,
});

export const EmptyState = styled(Box)({
  padding: "28px",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel)",
  color: "var(--muted)",
  textAlign: "center",
});
