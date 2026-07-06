import { Box, Card, CardContent, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

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

const soundwaveAnimation = keyframes`
  0%, 100% {
    transform: scaleY(0.75);
  }
  50% {
    transform: scaleY(2.2);
  }
`;

const ParticipantCardRoot = styled(Card, {
  shouldForwardProp: (prop) =>
    !["isSpeaking", "isCurrentUser", "accentColor", "accentGlow"].includes(prop),
})(({ isSpeaking, isCurrentUser, accentColor, accentGlow }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: 250,
  overflow: "hidden",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel-soft)",
  color: "var(--text)",
  transition: "border-color 140ms ease, box-shadow 140ms ease",
  boxShadow: "none",
  ...(isCurrentUser && {
    gridColumn: "1 / -1",
    width: "min(560px, 100%)",
    justifySelf: "center",
  }),
  ...(isSpeaking && {
    borderColor: accentColor,
    boxShadow: `0 0 0 3px ${accentGlow}`,
  }),
  "@media (max-width: 960px)": {
    width: "100%",
    gridColumn: "auto",
    minHeight: 220,
  },
}));

const ParticipantHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "14px 16px",
  borderBottom: "1px solid var(--border)",
  backgroundColor: "var(--panel)",
});

const ParticipantName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accentColor",
})(({ accentColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  color: accentColor,
}));

const ParticipantDot = styled(Box)({
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  backgroundColor: "currentColor",
});

const Soundwave = styled(Box, {
  shouldForwardProp: (prop) => !["isSpeaking", "accentColor"].includes(prop),
})(({ isSpeaking, accentColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  width: "40px",
  height: "26px",
  borderRadius: "999px",
  backgroundColor: "rgba(96, 165, 250, 0.08)",
  opacity: isSpeaking ? 1 : 0.3,
  "& > span": {
    width: "3px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: accentColor,
    transformOrigin: "center",
    ...(isSpeaking && {
      animation: `${soundwaveAnimation} 760ms ease-in-out infinite`,
    }),
  },
  "& > span:nth-of-type(2)": {
    animationDelay: "120ms",
  },
  "& > span:nth-of-type(3)": {
    animationDelay: "240ms",
  },
  "& > span:nth-of-type(4)": {
    animationDelay: "360ms",
  },
}));

const TranscriptContent = styled(CardContent)({
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "10px",
  padding: "16px",
  "&.MuiCardContent-root:last-child": {
    paddingBottom: "16px",
  },
});

const TranscriptLine = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isCurrent",
})(({ isCurrent }) => ({
  margin: 0,
  fontFamily: "inherit",
  lineHeight: 1.45,
  color: isCurrent ? "var(--text)" : "var(--muted)",
  fontWeight: isCurrent ? 600 : 400,
}));

const ParticipantLabel = styled(Typography)({
  fontWeight: 700,
  color: "currentColor",
  fontFamily: "inherit",
});

function MatchParticipantCard({ participant, results }) {
  const orderedResults = [...results].sort(
    (left, right) => left.resultIndex - right.resultIndex,
  );
  const accent = participantAccent[participant.id] ?? participantAccent.blue;

  return (
    <ParticipantCardRoot
      component="article"
      elevation={0}
      isSpeaking={participant.isSpeaking}
      isCurrentUser={participant.isCurrentUser}
      accentColor={accent.color}
      accentGlow={accent.glow}
      aria-label={`${participant.label} player${participant.isCurrentUser ? " current user" : ""}${participant.isSpeaking ? " speaking" : ""}`}
    >
      <ParticipantHeader>
        <ParticipantName accentColor={accent.color}>
          <ParticipantDot component="span" aria-hidden="true" />
          <ParticipantLabel component="span" variant="body2">
            {participant.label}
          </ParticipantLabel>
        </ParticipantName>

        <Soundwave
          isSpeaking={participant.isSpeaking}
          accentColor={accent.color}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
        </Soundwave>
      </ParticipantHeader>

      <TranscriptContent>
        {orderedResults.map((result) => (
          <TranscriptLine
            key={`${participant.id}-${result.resultIndex}`}
            component="p"
            variant="body2"
            isCurrent={!result.isFinal}
          >
            {result.alternatives[0]?.transcript}
          </TranscriptLine>
        ))}
      </TranscriptContent>
    </ParticipantCardRoot>
  );
}

export default MatchParticipantCard;
