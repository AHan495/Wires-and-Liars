import { Box, Button, InputBase, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const LobbyMain = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px 24px",
  overflow: "hidden",
  color: "var(--text)",
  "& .MuiTypography-root, & .MuiButton-root, & .MuiInputBase-root": {
    fontFamily: "inherit",
  },
  "@media (max-width: 960px)": {
    minHeight: "100vh",
    height: "auto",
    padding: "20px",
    overflow: "visible",
  },
});

export const LobbyLayout = styled(Box)({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.6fr) minmax(320px, 0.9fr)",
  gap: "20px",
  height: "100%",
  minHeight: 0,
  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    height: "auto",
  },
});

export const Panel = styled(Box)({
  border: "1px solid var(--border)",
  borderRadius: "16px",
  backgroundColor: "var(--panel)",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
});

export const RoomsPanel = styled(Panel)({
  display: "grid",
  gridTemplateRows: "auto auto minmax(0, 1fr) auto",
  minHeight: 0,
  height: "100%",
});

export const PanelHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  padding: "14px 16px 12px",
  borderBottom: "1px solid var(--border)",
});

export const PanelBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minHeight: 0,
  padding: "14px 16px",
});

export const PanelTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontSize: "1.5rem",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const RoomsToolbar = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
  padding: "12px 16px",
});

export const Field = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const FieldLabel = styled(Typography)({
  color: "var(--muted)",
  fontSize: "0.78rem",
});

export const InputShell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "9px 11px",
  backgroundColor: "var(--panel-strong)",
  transition: "border-color 140ms ease, box-shadow 140ms ease",
  "&:focus-within": {
    borderColor: "var(--border-strong)",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.14)",
  },
  "& svg": {
    flex: "0 0 auto",
    marginTop: "1px",
    color: "var(--muted)",
  },
});

export const TextInput = styled(InputBase)({
  width: "100%",
  color: "var(--text)",
  fontSize: "0.92rem",
  "& input": {
    padding: 0,
  },
  "& input::placeholder": {
    color: "#71717a",
    opacity: 1,
  },
});

export const InlineField = styled(Box)({
  display: "flex",
  gap: "8px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export const JoinCodeInputShell = styled(InputShell)({
  flex: 1,
});

export const RoomList = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  minHeight: 0,
  alignContent: "start",
  gridAutoRows: "max-content",
  overflowY: "auto",
  padding: "6px 16px 14px",
  backgroundColor: "transparent",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    border: "2px solid transparent",
    borderRadius: "20px",
    backgroundColor: "#3a3a42",
    backgroundClip: "padding-box",
  },
  "@media (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    maxHeight: "50vh",
  },
});

export const RoomListEmpty = styled(Typography)({
  margin: 0,
  padding: "18px 6px",
  color: "var(--muted)",
  textAlign: "center",
});

export const LobbySidebar = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minHeight: 0,
});

export const PrimaryButton = styled(Button)({
  borderRadius: "20px",
  minHeight: "36px",
  padding: "7px 12px",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  backgroundColor: "rgba(37, 99, 235, 0.72)",
  color: "#ffffff",
  boxShadow: "none",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(37, 99, 235, 0.72)",
    boxShadow: "none",
    opacity: 0.92,
  },
});

export const BlockPrimaryButton = styled(PrimaryButton)({
  width: "100%",
});

export const JoinCodeButton = styled(PrimaryButton)({
  width: "96px",
  flex: "0 0 96px",
  "@media (max-width: 960px)": {
    width: "100%",
    flexBasis: "auto",
  },
});
