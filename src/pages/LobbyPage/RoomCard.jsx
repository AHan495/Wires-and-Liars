import { KeyRound, LogIn, Radio, UserRound } from "lucide-react";
import { Box, Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/system";

const RoomCardRoot = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
  gap: "12px",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "12px",
  backgroundColor: "var(--panel-soft)",
  color: "var(--text)",
  boxShadow: "none",
  transition: "border-color 140ms ease, box-shadow 140ms ease",
  "&:hover": {
    borderColor: "var(--border-strong)",
    boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.12)",
  },
});

const RoomCardMain = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const RoomCardHeading = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const RoomCardIcon = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  backgroundColor: "rgba(37, 99, 235, 0.14)",
  color: "var(--accent-strong)",
});

const RoomTitle = styled(Typography)({
  margin: 0,
  color: "var(--text)",
  fontFamily: "inherit",
  fontSize: "0.98rem",
  fontWeight: 700,
  lineHeight: 1.25,
});

const RoomCardMeta = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  color: "var(--muted)",
  fontSize: "0.76rem",
});

const MetaItem = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

const RoomCardActions = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "6px",
  "@media (max-width: 960px)": {
    width: "100%",
    flexDirection: "column",
  },
});

const JoinRoomButton = styled(Button)({
  flex: 1,
  borderRadius: "20px",
  minHeight: "36px",
  padding: "7px 12px",
  border: "1px solid rgba(96, 165, 250, 0.2)",
  backgroundColor: "rgba(37, 99, 235, 0.2)",
  color: "#ffffff",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "none",
  backdropFilter: "blur(4px)",
  "&:hover, &:focus-visible": {
    borderColor: "var(--border-strong)",
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    boxShadow: "none",
    opacity: 0.92,
  },
});

function RoomCard({ room, onJoinRoom }) {
  return (
    <RoomCardRoot component="article" elevation={0}>
      <RoomCardMain>
        <RoomCardHeading>
          <RoomCardIcon component="span">
            <Radio size={14} strokeWidth={2} />
          </RoomCardIcon>
          <RoomTitle component="h3" variant="h3">
            {room.name}
          </RoomTitle>
        </RoomCardHeading>
        <RoomCardMeta>
          <MetaItem component="span">
            {/* Want to use sockets to update realtime */}
            <UserRound size={13} strokeWidth={2} />
            {room.players} / 2
          </MetaItem>
          <MetaItem component="span">
            <Radio size={13} strokeWidth={2} />
            Host: Player 1
          </MetaItem>
          <MetaItem component="span">
            <KeyRound size={13} strokeWidth={2} />
            Code: {room.id}
          </MetaItem>
        </RoomCardMeta>
      </RoomCardMain>

      <RoomCardActions>
        <JoinRoomButton
          type="button"
          variant="contained"
          startIcon={<LogIn size={14} strokeWidth={2} />}
          onClick={() => onJoinRoom(room)}
        >
          Join room
        </JoinRoomButton>
      </RoomCardActions>
    </RoomCardRoot>
  );
}

export default RoomCard;
