import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const RoomMain = styled(Box)({
  minHeight: "100vh",
  padding: "28px 24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root": {
    fontFamily: "inherit",
  },
  "@media (max-width: 960px)": {
    padding: "20px",
  },
});

export const RoomShell = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "min(1040px, 100%)",
  margin: "0 auto",
  padding: "24px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  backgroundColor: "var(--panel)",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
  "@media (max-width: 960px)": {
    padding: "18px",
  },
});

export const RoomHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export const RoomHero = styled(Box)({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "space-between",
  gap: "16px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export const RoomHeroCopy = styled(Box)({
  flex: 1,
});

export const RoomEyebrow = styled(Typography)({
  margin: "0 0 8px",
  color: "var(--accent-strong)",
  fontSize: "0.76rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const RoomTitle = styled(Typography)({
  margin: "0 0 10px",
  color: "var(--text)",
  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const RoomDescription = styled(Typography)({
  margin: 0,
  color: "var(--muted)",
  maxWidth: "48ch",
});

export const RoomCodeCard = styled(Box)({
  minWidth: "220px",
  padding: "18px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  backgroundColor: "var(--panel-strong)",
});

export const RoomCodeLabel = styled(Typography)({
  display: "block",
  marginBottom: "8px",
  color: "var(--muted)",
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const RoomCode = styled(Typography)({
  display: "block",
  marginBottom: "10px",
  color: "var(--text)",
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
});

export const RoomCodeVisibility = styled(Typography)({
  display: "block",
  color: "var(--accent-strong)",
  fontSize: "0.84rem",
});

export const RoomGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "18px",
  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
  },
});

export const RoomDetailCard = styled(Box)({
  padding: "18px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  backgroundColor: "var(--panel)",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
});

export const RoomDetailHeading = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "14px",
  color: "var(--accent-strong)",
});

export const RoomDetailTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "1rem",
  fontWeight: 700,
});

export const RoomDetailList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const RoomDetailItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 14px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  backgroundColor: "var(--panel-soft)",
});

export const RoomDetailLabel = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.82rem",
});

export const RoomDetailValue = styled(Typography)({
  color: "var(--text)",
  fontWeight: 700,
});

export const RoomPlayerCard = styled(RoomDetailItem, {
  shouldForwardProp: (prop) => prop !== "empty",
})(({ empty }) => ({
  borderColor: empty ? "var(--border)" : "rgba(96, 165, 250, 0.32)",
  borderStyle: empty ? "dashed" : "solid",
}));

export const RoomPlayerName = styled(Typography)({
  color: "var(--text)",
  fontWeight: 600,
});

export const RoomPlayerRole = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.82rem",
});

export const RoomActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "16px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export const GhostButton = styled(Button)({
  borderRadius: "20px",
  minHeight: "36px",
  padding: "7px 12px",
  borderColor: "var(--border)",
  backgroundColor: "rgba(22, 32, 51, 0.74)",
  color: "var(--text)",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(22, 32, 51, 0.74)",
    opacity: 0.92,
  },
});

export const PrimaryButton = styled(Button)({
  borderRadius: "20px",
  minHeight: "36px",
  padding: "7px 12px",
  backgroundColor: "rgba(37, 99, 235, 0.72)",
  color: "#ffffff",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "none",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(37, 99, 235, 0.72)",
    boxShadow: "none",
    opacity: 0.92,
  },
});
