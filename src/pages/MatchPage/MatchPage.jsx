import { ChevronDown, ChevronUp, LogOut, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchParticipantCard from "./MatchParticipantCard";
import {
  MatchControlDangerButton,
  MatchControlSecondaryButton,
  MatchControls,
  MatchHistoryHeader,
  MatchHistoryItem,
  MatchHistoryList,
  MatchHistoryPanel,
  MatchHistorySpeaker,
  MatchHistoryText,
  MatchIdentity,
  MatchIdentityAccent,
  MatchIdentityText,
  MatchMain,
  MatchShell,
  MatchSwatch,
  MatchTimer,
  MatchTopBar,
  MatchVoiceGrid,
} from "./MatchPage.styles";
import { getRoom, leaveRoom } from "../../services/rooms-api";
import { getCurrentUser } from "../../services/auth-api";
import {
  sendMatchMessage,
  subscribeToMatchMessages,
} from "../../services/rooms-socket";
import { useRoomFromLocationState } from "../../utils/roomState";
import { useVoiceIO } from "../../hooks/useVoiceIO";

// Color themes of players (2 human + 1 AI)
const participantAccent = {
  red: {
    color: "#f87171",
    glow: "rgba(248, 113, 113, 0.16)",
  },
  green: {
    color: "#4ade80",
    glow: "rgba(74, 222, 128, 0.16)",
  },
  blue: {
    color: "var(--accent-strong)",
    glow: "rgba(96, 165, 250, 0.16)",
  },
};

function MatchPage() {
  const navigate = useNavigate();
  const room = useRoomFromLocationState();
  const [currentUser, setCurrentUser] = useState({ userId: null, user: null });

  // Message history throughout the match
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [activeMessageId, setActiveMessageId] = useState(null);

  // Uses useRef, because we don't want (no need) to re-render when the value changes
  // This is to check whether the message belongs to myself or not
  // If it belongs to myself, the message does not get read aloud
  const currentUserIdRef = useRef(null);

  // Function passed to useVoiceIO
  function handleRecognizedSpeech(text) {
    setIsListening(false);

    if (!room?.id || !text.trim()) return;

    sendMatchMessage(room.id, {
      senderId: currentUserIdRef.current,
      text,
    });
  }

  // Pass in onListenStart, onListenResult, onListenEnd
  const { startListening, speak } = useVoiceIO(
    () => setIsListening(true),
    handleRecognizedSpeech,
    () => setIsListening(false),
  );

  // Set current user
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        currentUserIdRef.current = res.userId;
        setCurrentUser(res);
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
        setMessages(res.room.messages ?? []);
      })
      .catch(() => {});

    return subscribeToMatchMessages(room.id, (message) => {
      setMessages((currentMessages) => [...currentMessages, message]);

      // Read the message aloud if it does not belong to myself
      if (
        currentUserIdRef.current &&
        message.senderId !== currentUserIdRef.current
      ) {
        setActiveSpeakerId(message.senderId);
        setActiveMessageId(message.id);
        speak(message.text, () => {
          setActiveSpeakerId(null);
          setActiveMessageId(null);
        });
      }
    });
  }, [navigate, room?.id, speak]);

  // Set participants for UI
  const participants = (room?.matchParticipants ?? []).map((participant) => ({
    id: participant.userId,
    color: participant.color,
    label: participant.label ?? participant.color,
    accentColor: participantAccent[participant.color]?.color,
    accentGlow: participantAccent[participant.color]?.glow,
    isSpeaking:
      activeSpeakerId === participant.userId ||
      (isListening && currentUser.userId === participant.userId),
    isCurrentUser: currentUser.userId === participant.userId,
  }));

  // Get the owner of the message
  function getParticipantForMessage(message) {
    return participants.find(
      (participant) => participant.id === message.senderId,
    );
  }

  // Format messages for UI
  const speechResults = messages.map((message, index) => ({
    participantId: message.senderId,
    resultIndex: index,
    isActive: message.id === activeMessageId,
    text: message.text,
  }));

  // Get my participant info (eg. my color)
  const currentParticipant = participants.find(
    (participant) => participant.isCurrentUser,
  );

  function handleLeaveGame() {
    if (!room?.id) {
      navigate("/lobby");
      return;
    }

    leaveRoom(room.id).then(() => {
      navigate("/lobby");
    });
  }

  if (!room) {
    return null;
  }

  return (
    <MatchMain component="main">
      <MatchShell component="section" aria-label="Voice chat game room">
        <MatchTopBar component="header">
          <MatchIdentity>
            <MatchSwatch
              component="span"
              aria-hidden="true"
              swatchColor={currentParticipant?.accentColor}
              swatchGlow={currentParticipant?.accentGlow}
            />
            <MatchIdentityText component="span" variant="body1">
              You are{" "}
              <MatchIdentityAccent
                component="span"
                accentColor={currentParticipant?.accentColor}
              >
                {currentParticipant?.color ?? "unknown"}
              </MatchIdentityAccent>
            </MatchIdentityText>
          </MatchIdentity>

          <MatchTimer component="div" aria-live="polite">
            0:15
          </MatchTimer>
        </MatchTopBar>

        <MatchVoiceGrid
          component="section"
          aria-label="Players"
          isHistoryOpen={isHistoryOpen}
        >
          {participants.map((participant) => {
            const participantResults = speechResults.filter(
              (result) => result.participantId === participant.id,
            );

            return (
              <MatchParticipantCard
                key={participant.id}
                participant={participant}
                results={participantResults}
              />
            );
          })}
        </MatchVoiceGrid>

        <MatchHistoryPanel component="section">
          <MatchHistoryHeader
            type="button"
            disableRipple
            disableFocusRipple
            onClick={() => setIsHistoryOpen((currentValue) => !currentValue)}
            endIcon={
              isHistoryOpen ? (
                <ChevronUp size={16} strokeWidth={2} />
              ) : (
                <ChevronDown size={16} strokeWidth={2} />
              )
            }
          >
            Message history
          </MatchHistoryHeader>

          {isHistoryOpen ? (
            <MatchHistoryList>
              {messages.map((message) => {
                const participant = getParticipantForMessage(message);

                return (
                  <MatchHistoryItem
                    key={message.id}
                    isActive={message.id === activeMessageId}
                    activeGlow={participant?.accentGlow}
                  >
                    <MatchHistorySpeaker
                      component="span"
                      speakerColor={participant?.accentColor}
                    >
                      {participant?.color ?? "unknown"}
                    </MatchHistorySpeaker>
                    <MatchHistoryText component="p">
                      {message.text}
                    </MatchHistoryText>
                  </MatchHistoryItem>
                );
              })}
            </MatchHistoryList>
          ) : null}
        </MatchHistoryPanel>

        <MatchControls component="footer" aria-label="Game controls">
          <MatchControlSecondaryButton
            type="button"
            variant="outlined"
            startIcon={
              isListening ? (
                <MicOff size={16} strokeWidth={2} />
              ) : (
                <Mic size={16} strokeWidth={2} />
              )
            }
            onClick={startListening}
            disabled={!currentUser.userId || isListening}
          >
            {isListening ? "Listening..." : "Speak"}
          </MatchControlSecondaryButton>

          <MatchControlDangerButton
            type="button"
            variant="contained"
            startIcon={<LogOut size={16} strokeWidth={2} />}
            onClick={handleLeaveGame}
          >
            Leave game
          </MatchControlDangerButton>
        </MatchControls>
      </MatchShell>
    </MatchMain>
  );
}

export default MatchPage;
