import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import AppNav from "../../components/AppNav";
import { useAuth } from "../../auth/AuthContext";
import { getMatchHistories } from "../../services/rooms-api";
import {
  EmptyState,
  HistoryCard,
  HistoryCount,
  HistoryList,
  HistoryMeta,
  HistoryPagination,
  HistoryRoomName,
  HistoryText,
  HistoryToggle,
  PaginationActions,
  PaginationButton,
  PaginationInfo,
  ProfileEmail,
  ProfileHeader,
  ProfileMain,
  ProfileShell,
  ProfileTitle,
  ResultBadge,
  TranscriptLine,
  TranscriptMessage,
  TranscriptPanel,
  TranscriptSpeaker,
} from "./ProfilePage.styles";

const HISTORIES_PER_PAGE = 10;

function formatDate(value) {
  if (!value) return "Unknown date";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getSpeakerLabel(message) {
  return message.color ?? "unknown";
}

const speakerColors = {
  red: "#f87171",
  green: "#4ade80",
  blue: "#60a5fa",
};

function getSpeakerColor(message) {
  return speakerColors[message.color] ?? "var(--accent-strong)";
}

function ProfilePage() {
  const { currentUser } = useAuth();
  const [histories, setHistories] = useState([]);
  const [openHistoryIds, setOpenHistoryIds] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const totalPages = Math.max(1, Math.ceil(histories.length / HISTORIES_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * HISTORIES_PER_PAGE;
  const visibleHistories = histories.slice(
    pageStartIndex,
    pageStartIndex + HISTORIES_PER_PAGE,
  );

  // open transcript
  function toggleHistory(historyId) {
    setOpenHistoryIds((currentValue) => ({
      ...currentValue,
      [historyId]: !currentValue[historyId],
    }));
  }

  useEffect(() => {
    let isMounted = true;

    getMatchHistories()
      .then((res) => {
        if (!isMounted) return;

        setHistories(res.histories ?? []);
        setCurrentPage(1);
        setErrorMessage("");
      })
      .catch(() => {
        if (isMounted) {
          setErrorMessage("Could not load match history.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProfileMain component="main">
      <AppNav />

      <ProfileShell component="section">
        <ProfileHeader component="header">
          <div>
            <ProfileTitle component="h1">Profile</ProfileTitle>
            <ProfileEmail component="p">{currentUser?.email}</ProfileEmail>
          </div>
          <HistoryCount component="span">
            {histories.length} match{histories.length === 1 ? "" : "es"}
          </HistoryCount>
        </ProfileHeader>

        {isLoading || errorMessage || histories.length === 0 ? (
          <EmptyState>
            {isLoading
              ? "Loading match history..."
              : errorMessage || "No match history yet."}
          </EmptyState>
        ) : (
          <>
            <HistoryList component="section" aria-label="Match history">
              {visibleHistories.map((history) => {
                const result = history.matchResult;
                const isTranscriptOpen = Boolean(openHistoryIds[history.id]);

                return (
                  <HistoryCard
                    key={history.id}
                    component="article"
                    humansWin={result?.humansWin}
                  >
                    <HistoryMeta>
                      <ResultBadge humansWin={result?.humansWin}>
                        {result?.humansWin ? "Win" : "Lose"}
                      </ResultBadge>
                      <HistoryRoomName component="h2">
                        {history.roomName || history.roomId}
                      </HistoryRoomName>
                      <HistoryText component="p">
                        {formatDate(history.createdAt)}
                      </HistoryText>
                      <HistoryText component="p">
                        Color: {result?.playerColor ?? "unknown"}
                      </HistoryText>
                    <HistoryToggle
                      type="button"
                      variant="outlined"
                      endIcon={
                        isTranscriptOpen ? (
                          <ChevronUp size={16} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={2} />
                        )
                      }
                      onClick={() => toggleHistory(history.id)}
                    >
                      Transcripts
                    </HistoryToggle>
                    </HistoryMeta>

                    {isTranscriptOpen ? (
                      <TranscriptPanel>
                        {(history.messages ?? []).map((message, index) => (
                          <TranscriptLine key={message.id ?? index}>
                            <TranscriptSpeaker
                              component="span"
                              speakerColor={getSpeakerColor(message)}
                            >
                              {getSpeakerLabel(message)}
                            </TranscriptSpeaker>
                            <TranscriptMessage component="p">
                              {message.text}
                            </TranscriptMessage>
                          </TranscriptLine>
                        ))}
                      </TranscriptPanel>
                    ) : null}
                  </HistoryCard>
                );
              })}
            </HistoryList>

            <HistoryPagination>
              <PaginationInfo component="span">
                Page {currentPage} of {totalPages}
              </PaginationInfo>
              <PaginationActions>
                <PaginationButton
                  type="button"
                  variant="outlined"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((currentValue) => Math.max(1, currentValue - 1))
                  }
                >
                  Previous
                </PaginationButton>
                <PaginationButton
                  type="button"
                  variant="outlined"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((currentValue) =>
                      Math.min(totalPages, currentValue + 1),
                    )
                  }
                >
                  Next
                </PaginationButton>
              </PaginationActions>
            </HistoryPagination>
          </>
        )}
      </ProfileShell>
    </ProfileMain>
  );
}

export default ProfilePage;
