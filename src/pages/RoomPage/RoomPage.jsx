import { ArrowLeft, Play, Radio, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  GhostButton,
  PrimaryButton,
  RoomActions,
  RoomCode,
  RoomCodeCard,
  RoomCodeLabel,
  RoomCodeVisibility,
  RoomDescription,
  RoomDetailCard,
  RoomDetailHeading,
  RoomDetailItem,
  RoomDetailLabel,
  RoomDetailList,
  RoomDetailTitle,
  RoomDetailValue,
  RoomEyebrow,
  RoomGrid,
  RoomHeader,
  RoomHero,
  RoomHeroCopy,
  RoomMain,
  RoomPlayerCard,
  RoomPlayerName,
  RoomPlayerRole,
  RoomShell,
  RoomTitle,
} from "./RoomPage.styles";
import { useRoomFromLocationState } from "../../utils/roomState";

function RoomPage() {
  const navigate = useNavigate();
  const room = useRoomFromLocationState();
  const slotsLeft = Math.max(0, 2 - room.players);

  return (
    <RoomMain component="main">
      <RoomShell component="section">
        <RoomHeader component="header">
          <GhostButton
            type="button"
            variant="outlined"
            startIcon={<ArrowLeft size={14} strokeWidth={2} />}
            onClick={() => navigate("/lobby")}
          >
            Back to lobby
          </GhostButton>
        </RoomHeader>

        <RoomHero component="section">
          <RoomHeroCopy>
            <RoomEyebrow component="p" variant="body2">
              Room Lobby
            </RoomEyebrow>
            <RoomTitle component="h1" variant="h1">
              {room.name || "Untitled Room"}
            </RoomTitle>
            <RoomDescription component="p" variant="body1">
              Share the room code with another player and start when everyone is
              ready.
            </RoomDescription>
          </RoomHeroCopy>

          <RoomCodeCard>
            <RoomCodeLabel component="span">Room code</RoomCodeLabel>
            <RoomCode component="strong">{room.id}</RoomCode>
            <RoomCodeVisibility component="span">
              {room.public ? "Public room" : "Private room"}
            </RoomCodeVisibility>
          </RoomCodeCard>
        </RoomHero>

        <RoomGrid component="section">
          <RoomDetailCard component="article">
            <RoomDetailHeading>
              <Radio size={16} strokeWidth={2} />
              <RoomDetailTitle component="h2" variant="h2">
                Room details
              </RoomDetailTitle>
            </RoomDetailHeading>

            <RoomDetailList>
              <RoomDetailItem>
                <RoomDetailLabel component="span">Host</RoomDetailLabel>
                <RoomDetailValue component="strong">
                  {room.host}
                </RoomDetailValue>
              </RoomDetailItem>
              <RoomDetailItem>
                <RoomDetailLabel component="span">
                  Players joined
                </RoomDetailLabel>
                <RoomDetailValue component="strong">
                  {room.players} / 2
                </RoomDetailValue>
              </RoomDetailItem>
              <RoomDetailItem>
                <RoomDetailLabel component="span">Open slots</RoomDetailLabel>
                <RoomDetailValue component="strong">
                  {slotsLeft}
                </RoomDetailValue>
              </RoomDetailItem>
            </RoomDetailList>
          </RoomDetailCard>

          <RoomDetailCard component="article">
            <RoomDetailHeading>
              <Users size={16} strokeWidth={2} />
              <RoomDetailTitle component="h2" variant="h2">
                Players
              </RoomDetailTitle>
            </RoomDetailHeading>

            <RoomDetailList>
              <RoomPlayerCard>
                <RoomPlayerName component="span">{room.host}</RoomPlayerName>
                <RoomPlayerRole component="span">Host</RoomPlayerRole>
              </RoomPlayerCard>
              <RoomPlayerCard empty>
                <RoomPlayerName component="span">
                  Waiting for player 2
                </RoomPlayerName>
                <RoomPlayerRole component="span">Open slot</RoomPlayerRole>
              </RoomPlayerCard>
            </RoomDetailList>
          </RoomDetailCard>
        </RoomGrid>

        <RoomActions component="footer">
          <PrimaryButton
            type="button"
            variant="contained"
            startIcon={<Play size={14} strokeWidth={2} />}
            onClick={() => navigate("/match", { state: { room } })}
          >
            Start
          </PrimaryButton>
        </RoomActions>
      </RoomShell>
    </RoomMain>
  );
}

export default RoomPage;
