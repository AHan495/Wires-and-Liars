import { Stack, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Users, Cpu, Search } from "lucide-react";
import {
  LandingMain,
  LandingShell,
  HeroCard,
  CTAButton,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  BrandEyebrow,
  HeroTitle,
  HeroSubtitle,
} from "./LandingPage.styles";

function LandingPage() {
  const navigate = useNavigate();
  const { currentUser, isLoadingCurrentUser } = useAuth();

  function handleGetStarted() {
    // If still loading user state, do nothing
    if (isLoadingCurrentUser) return;
    if (currentUser) navigate("/lobby");
    else navigate("/login");
  }

  return (
    <LandingMain>
      <LandingShell>
        <HeroCard>
          <Stack spacing={2}>
            <BrandEyebrow>Wires and Liars</BrandEyebrow>
            <HeroTitle component="h1">Read the room, before it reads you</HeroTitle>
            <HeroSubtitle>
              A social-deduction game where two humans try to spot the AI pretending to be human. Bluff, probe, and vote — but watch your words.
            </HeroSubtitle>
          </Stack>
        </HeroCard>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Users size={20} />
            </FeatureIcon>
            <Typography variant="h6">Join a game with one other human + AI</Typography>
            <Typography variant="body2" color="text.secondary">
              Quick social deduction matches. Short rounds, big suspicion.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Search size={20} />
            </FeatureIcon>
            <Typography variant="h6">Probe, bluff, and sus the AI</Typography>
            <Typography variant="body2" color="text.secondary">
              Ask questions, judge replies, and try to find the model posing as a player.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Cpu size={20} />
            </FeatureIcon>
            <Typography variant="h6">If both humans vote the AI, they win</Typography>
            <Typography variant="body2" color="text.secondary">
              Coordinate with chat and vote carefully — ties favor the AI.
            </Typography>
          </FeatureCard>

          <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", mt: 1 }}>
            <CTAButton variant="contained" onClick={handleGetStarted}>
              Get started
            </CTAButton>
          </Box>
        </FeaturesGrid>
      </LandingShell>
    </LandingMain>
  );
}

export default LandingPage;
