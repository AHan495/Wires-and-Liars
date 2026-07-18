import { ArrowLeft, Play, Radio, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
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
import {
  deleteRoom,
  getRoom,
  leaveRoom,
  startMatch,
} from "../../services/rooms-api";
import { subscribeToRoom } from "../../services/rooms-socket";
import { getCurrentUser } from "../../services/auth-api";

function getParticipantRole(room, participant) {
  if (participant.userId === room.hostId) {
    return "Host";
  }
  return "Player";
}

function RoomPage() {
  const navigate = useNavigate();
  const initialRoom = useRoomFromLocationState();
  const [room, setRoom] = useState(initialRoom);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setCurrentUserId(res.userId);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    if (!room?.id) {
      navigate("/lobby");
      return undefined;
    }

    getRoom(room.id)
      .then((res) => {
        if (res.room?.started) {
          navigate("/match", { state: { room: res.room } });
          return;
        }
        setRoom(res.room);
      })
      .catch(() => {
        navigate("/lobby");
      });

    const unsubscribe = subscribeToRoom(room.id, {
      onRoomUpdated: (updatedRoom) => {
        if (updatedRoom.started) {
          navigate("/match", { state: { room: updatedRoom } });
          return;
        }
        setRoom(updatedRoom);
      },
      onRoomDeleted: () => {
        navigate("/lobby");
      },
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, room?.id]);

  function handleStartMatch() {
    if (!room?.id) return;

    startMatch(room.id)
      .then((res) => {
        navigate("/match", { state: { room: res.room } });
      });
  }

  function handleDeleteRoom() {
    if (!room?.id) return;

    deleteRoom(room.id)
      .then(() => {
        navigate("/lobby");
      });
  }

  function handleBackToLobby() {
    if (!room?.id) {
      navigate("/lobby");
      return;
    }

    leaveRoom(room.id)
      .then(() => {
        navigate("/lobby");
      });
  }

  if (!room) {
    return null;
  }

  return (
    <RoomMain component="main">
      <RoomShell component="section">
        <RoomHeader component="header">
          <GhostButton
            type="button"
            variant="outlined"
            startIcon={<ArrowLeft size={14} strokeWidth={2} />}
            onClick={handleBackToLobby}
          >
            Back to lobby
          </GhostButton>
          {currentUserId === room.hostId ? (
            <GhostButton
              type="button"
              variant="outlined"
              startIcon={<Trash2 size={14} strokeWidth={2} />}
              onClick={handleDeleteRoom}
            >
              Delete room
            </GhostButton>
          ) : null}
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
                  {room.hostname}
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
                  {Math.max(0, 2 - (room.players ?? 0))}
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
              {room.participants.map((participant) => (
                <RoomPlayerCard key={participant.userId}>
                  <RoomPlayerName component="span">
                    {participant.username}
                  </RoomPlayerName>
                  <RoomPlayerRole component="span">
                    {getParticipantRole(room, participant)}
                  </RoomPlayerRole>
                </RoomPlayerCard>
              ))}
              {room.participants.length < 2 ? (
                <RoomPlayerCard empty>
                  <RoomPlayerName component="span">
                    Waiting for player 2
                  </RoomPlayerName>
                  <RoomPlayerRole component="span">Open slot</RoomPlayerRole>
                </RoomPlayerCard>
              ) : null}
            </RoomDetailList>
          </RoomDetailCard>
        </RoomGrid>

        <RoomActions component="footer">
          {currentUserId === room.hostId ? (
            <PrimaryButton
              type="button"
              variant="contained"
              startIcon={<Play size={14} strokeWidth={2} />}
              onClick={handleStartMatch}
              disabled={room.players < 2}
            >
              Start
            </PrimaryButton>
          ) : null}
        </RoomActions>
      </RoomShell>
    </RoomMain>
  );
}

export default RoomPage;
