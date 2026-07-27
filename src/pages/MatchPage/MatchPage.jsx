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
  MatchResultPanel,
  MatchResultCountdown,
  MatchResultText,
  MatchShell,
  MatchStageText,
  MatchSwatch,
  MatchTimer,
  MatchTopBar,
  MatchVoteButton,
  MatchVoteOptions,
  MatchVotePanel,
  MatchVoteTitle,
  MatchVoiceGrid,
} from "./MatchPage.styles";
import {
  endMatch,
  getRoom,
  leaveRoom,
  voteInMatch,
} from "../../services/rooms-api";
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

const RESULT_DISPLAY_SECONDS = 5;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getRemainingSeconds(endsAt, now) {
  const endTime = new Date(endsAt).getTime();
  if (!Number.isFinite(endTime)) return 0;

  return Math.max(0, Math.ceil((endTime - now) / 1000));
}

function MatchPage() {
  const navigate = useNavigate();
  const initialRoom = useRoomFromLocationState();
  const [room, setRoom] = useState(initialRoom);
  const [currentUser, setCurrentUser] = useState({ userId: null, user: null });

  // Message history throughout the match
  const [messages, setMessages] = useState([]);
  const [now, setNow] = useState(() => Date.now());
  const [isListening, setIsListening] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [endingCountdown, setEndingCountdown] = useState(
    RESULT_DISPLAY_SECONDS,
  );

  // Uses useRef, because we don't want (no need) to re-render when the value changes
  // This is to check whether the message belongs to myself or not
  // If it belongs to myself, the message does not get read aloud
  const currentUserIdRef = useRef(null);
  const discussionRemainingSeconds = getRemainingSeconds(
    room?.discussionEndsAt,
    now,
  );
  const voteRemainingSeconds = getRemainingSeconds(room?.voteEndsAt, now);
  const isDiscussionActive =
    room?.started && !room.matchResult && discussionRemainingSeconds > 0;
  const isVoteActive =
    room?.started &&
    !room.matchResult &&
    discussionRemainingSeconds === 0 &&
    voteRemainingSeconds > 0;
  const isVoteExpired =
    room?.started &&
    !room.matchResult &&
    discussionRemainingSeconds === 0 &&
    voteRemainingSeconds === 0;
  const matchResult = room?.matchResult ?? null;
  const matchCompletedAt = matchResult?.completedAt;

  // Function passed to useVoiceIO
  function handleRecognizedSpeech(text) {
    setIsListening(false);

    if (!room?.id || !text.trim() || !isDiscussionActive) return;

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
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!room?.id) {
      navigate("/lobby");
      return undefined;
    }

    getRoom(room.id)
      .then((res) => {
        setRoom(res.room);
        setMessages(res.room.messages ?? []);
      })
      .catch(() => {
        navigate("/lobby");
      });

    return subscribeToMatchMessages(room.id, {
      onMatchMessage: (message) => {
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
      },
      onRoomUpdated: (updatedRoom) => {
        if (!updatedRoom.started) {
          navigate("/lobby");
          return;
        }
        setRoom(updatedRoom);
        setMessages(updatedRoom.messages ?? []);
      },
      onRoomDeleted: () => {
        navigate("/lobby");
      },
    });
  }, [navigate, room?.id, speak]);

  // finalize after the vote time limit expires
  useEffect(() => {
    if (!room?.id || !isVoteExpired) {
      return;
    }

    getRoom(room.id)
      .then((res) => {
        setRoom(res.room);
        setMessages(res.room.messages ?? []);
      });
  }, [isVoteExpired, room?.id]);

  // automatically redirect to lobby after constant time after the vote ends
  useEffect(() => {
    if (!room?.id || !matchCompletedAt) return undefined;

    // count down every 1 second for displaying
    const intervalId = window.setInterval(() => {
      setEndingCountdown((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    // redirect to lobby after constant time
    const timeoutId = window.setTimeout(() => {
      endMatch(room.id).finally(() => {
        navigate("/lobby");
      });
    }, RESULT_DISPLAY_SECONDS * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [matchCompletedAt, navigate, room?.id]);

  // Set participants for UI
  const participants = (room?.matchParticipants ?? []).map((participant) => ({
    id: participant.userId,
    color: participant.color,
    label: participant.label ?? participant.color,
    isAI: Boolean(participant.isAI),
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
  const aiParticipant = participants.find((participant) => participant.isAI);
  const selectedVoteId = room?.matchVotes?.[currentUser.userId] ?? null;
  const timerLabel = isDiscussionActive
    ? formatTime(discussionRemainingSeconds)
    : formatTime(voteRemainingSeconds);
  const stageLabel = matchResult
    ? "Result"
    : isDiscussionActive
      ? "Talk time"
      : "Vote time";

  function handleLeaveGame() {
    if (!room?.id) {
      navigate("/lobby");
      return;
    }

    leaveRoom(room.id).then(() => {
      navigate("/lobby");
    });
  }

  function handleVote(targetId) {
    if (!room?.id || !isVoteActive || selectedVoteId || isVoting) return;

    setIsVoting(true);
    voteInMatch(room.id, targetId)
      .then((res) => {
        setRoom(res.room);
      })
      .finally(() => {
        setIsVoting(false);
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
                {currentParticipant?.label ?? "unknown"}
              </MatchIdentityAccent>
            </MatchIdentityText>
          </MatchIdentity>

          <MatchIdentity>
            <MatchStageText component="span">{stageLabel}</MatchStageText>
            <MatchTimer component="div" aria-live="polite">
              {matchResult ? "--:--" : timerLabel}
            </MatchTimer>
          </MatchIdentity>
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
                      {participant?.label ?? "unknown"}
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

        {isVoteActive ? (
          <MatchVotePanel component="section" aria-live="polite">
            <MatchVoteTitle component="h2">
              {selectedVoteId
                ? "Waiting for the other vote"
                : "Vote for the AI player"}
            </MatchVoteTitle>
            <MatchVoteOptions>
              {participants.map((participant) => (
                <MatchVoteButton
                  key={participant.id}
                  type="button"
                  variant="outlined"
                  selected={selectedVoteId === participant.id}
                  accentColor={participant.accentColor}
                  onClick={() => handleVote(participant.id)}
                  disabled={Boolean(selectedVoteId) || isVoting}
                >
                  {participant.label}
                </MatchVoteButton>
              ))}
            </MatchVoteOptions>
          </MatchVotePanel>
        ) : null}

        {matchResult ? (
          <MatchResultPanel
            component="section"
            humansWin={matchResult.humansWin}
          >
            <MatchResultText component="p">
              {matchResult.humansWin
                ? `Humans win. The AI was ${aiParticipant?.label ?? "unknown"}.`
                : `Humans lose. The AI was ${aiParticipant?.label ?? "unknown"}.`}
            </MatchResultText>
            <MatchResultCountdown component="span" aria-live="polite">
              Ending in {endingCountdown}s
            </MatchResultCountdown>
          </MatchResultPanel>
        ) : null}

        {isDiscussionActive ? (
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
        ) : null}
      </MatchShell>
    </MatchMain>
  );
}

export default MatchPage;
