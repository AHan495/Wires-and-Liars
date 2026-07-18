import { Box, Card, CardContent, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";

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
    !["isSpeaking", "accentColor", "accentGlow"].includes(prop),
})(({ isSpeaking, accentColor, accentGlow }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  backgroundColor: "var(--panel-soft)",
  color: "var(--text)",
  transition: "border-color 140ms ease, box-shadow 140ms ease",
  boxShadow: "none",
  ...(isSpeaking && {
    borderColor: accentColor,
    boxShadow: `0 0 0 3px ${accentGlow}`,
  }),
}));

const ParticipantHeader = styled(Box)({
  flex: "0 0 auto",
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
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "10px",
  padding: "16px",
  overflowY: "auto",
  "&.MuiCardContent-root:last-child": {
    paddingBottom: "16px",
  },
});

const TranscriptLine = styled(Typography, {
  shouldForwardProp: (prop) => !["isLatest", "accentGlow"].includes(prop),
})(({ isLatest, accentGlow }) => ({
  margin: 0,
  padding: isLatest ? "8px 10px" : 0,
  borderRadius: isLatest ? "10px" : 0,
  backgroundColor: isLatest ? accentGlow : "transparent",
  fontFamily: "inherit",
  lineHeight: 1.45,
  color: isLatest ? "var(--text)" : "var(--muted)",
  fontWeight: isLatest ? 700 : 400,
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
  const accent =
    participantAccent[participant.color] ??
    participantAccent[participant.id] ??
    participantAccent.blue;

  return (
    <ParticipantCardRoot
      component="article"
      elevation={0}
      isSpeaking={participant.isSpeaking}
      accentColor={accent.color}
      accentGlow={accent.glow}
      aria-label={`${participant.label} player${participant.isSpeaking ? " speaking" : ""}`}
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
            isLatest={result.isActive}
            accentGlow={accent.glow}
          >
            {result.text}
          </TranscriptLine>
        ))}
      </TranscriptContent>
    </ParticipantCardRoot>
  );
}

export default MatchParticipantCard;
