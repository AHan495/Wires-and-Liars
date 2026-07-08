import { LogOut, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MatchParticipantCard from "./MatchParticipantCard";
import {
  MatchControlDangerButton,
  MatchControlSecondaryButton,
  MatchControls,
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
import { useRoomFromLocationState } from "../../utils/roomState";

const participants = [
  {
    id: "red",
    label: "Red",
    isSpeaking: true,
    isCurrentUser: false,
  },
  {
    id: "green",
    label: "Green",
    isSpeaking: false,
    isCurrentUser: false,
  },
  {
    id: "blue",
    label: "Blue",
    isSpeaking: false,
    isCurrentUser: true,
  },
];

// Web Speech API reference:
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent/results
// Expected output shape (short): result event exposes resultIndex + results[];
// each results[i] has isFinal + alternatives[]; each alternative has transcript + confidence.
const speechResults = [
  {
    participantId: "red",
    resultIndex: 0,
    isFinal: true,
    alternatives: [
      {
        transcript:
          "I asked the same question twice because the first answer sounded rehearsed.",
        confidence: 0.89,
      },
    ],
  },
  {
    participantId: "red",
    resultIndex: 1,
    isFinal: false,
    alternatives: [
      {
        transcript: "Green, what did Blue say at the start about the prompt?",
        confidence: 0.62,
      },
    ],
  },
  {
    participantId: "green",
    resultIndex: 2,
    isFinal: true,
    alternatives: [
      {
        transcript:
          "Blue said the prompt was about planning a weekend trip, then asked who chose the lake.",
        confidence: 0.86,
      },
    ],
  },
  {
    participantId: "blue",
    resultIndex: 3,
    isFinal: true,
    alternatives: [
      {
        transcript:
          "I remember Red mentioning the cabin first, but I do not think Green followed up on that detail.",
        confidence: 0.91,
      },
    ],
  },
];

function MatchPage() {
  const navigate = useNavigate();
  const room = useRoomFromLocationState();

  return (
    <MatchMain component="main">
      <MatchShell component="section" aria-label="Voice chat game room">
        <MatchTopBar component="header">
          <MatchIdentity>
            <MatchSwatch component="span" aria-hidden="true" />
            <MatchIdentityText component="span" variant="body1">
              You are{" "}
              <MatchIdentityAccent component="span">Blue</MatchIdentityAccent>
            </MatchIdentityText>
          </MatchIdentity>

          <MatchTimer component="div" aria-live="polite">
            0:15
          </MatchTimer>
        </MatchTopBar>

        <MatchVoiceGrid component="section" aria-label="Players">
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

        <MatchControls component="footer" aria-label="Game controls">
          <MatchControlSecondaryButton
            type="button"
            variant="outlined"
            startIcon={<MicOff size={16} strokeWidth={2} />}
          >
            Mute
          </MatchControlSecondaryButton>

          <MatchControlDangerButton
            type="button"
            variant="contained"
            startIcon={<LogOut size={16} strokeWidth={2} />}
            onClick={() => navigate("/room", { state: { room } })}
          >
            Leave game
          </MatchControlDangerButton>
        </MatchControls>
      </MatchShell>
    </MatchMain>
  );
}

export default MatchPage;
