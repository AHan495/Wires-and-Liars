import { Search, Ticket, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomPanel from "./CreateRoomPanel";
import {
  Field,
  FieldLabel,
  InlineField,
  JoinCodeButton,
  JoinCodeInputShell,
  LobbyLayout,
  LobbyMain,
  LobbySidebar,
  PanelHeader,
  PanelTitle,
  RoomList,
  RoomListEmpty,
  RoomsPanel,
  RoomsToolbar,
  TextInput,
  InputShell,
} from "./LobbyPage.styles";
import RoomCard from "./RoomCard";
import {
  getPublicRooms,
  joinRoom,
} from "../../services/rooms-api";
import { subscribeToPublicRooms } from "../../services/rooms-socket";

function getRoomSearchValues(room) {
  return [room.name, room.host, room.hostId, room.id].filter(Boolean);
}

function LobbyPage() {
  // Use React Router hooks to access navigation and location state
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    getPublicRooms().then((res) => {
      if (isMounted) {
        setRooms(res.rooms);
        setErrorMessage("");
      }
    }).catch((error) => {
      if (isMounted) {
        setErrorMessage(error.message);
      }
    });

    const unsubscribe = subscribeToPublicRooms(({ publicRooms }) => {
      setRooms(publicRooms);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Normalize the search text for case-insensitive matching
  const normalizedSearch = searchText.trim().toLowerCase();

  // Filter rooms based on search text
  const filteredRooms = rooms.filter((room) => {
    if (!normalizedSearch) return true;

    return getRoomSearchValues(room).some((value) =>
      String(value).toLowerCase().includes(normalizedSearch),
    );
  });

  function joinPublicRoom(room) {
    joinRoom(room.id)
      .then((res) => {
        setErrorMessage("");
        navigate("/room", { state: { room: res.room } });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  // Function to handle joining a room by code
  function handleJoinByCode() {
    const normalizedCode = roomCode.trim().toUpperCase();
    if (!normalizedCode) return;

    joinRoom(normalizedCode)
      .then((res) => {
        setErrorMessage("");
        navigate("/room", { state: { room: res.room } });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <LobbyMain component="main">
      <LobbyLayout component="section" aria-label="Lobby layout">
        <RoomsPanel component="section">
          <PanelHeader component="header">
            <div>
              <PanelTitle component="h2" variant="h2">
                Public Rooms
              </PanelTitle>
            </div>
          </PanelHeader>

          <RoomsToolbar>
            <Field component="label">
              <FieldLabel component="span">Search rooms</FieldLabel>
              <InputShell>
                <Search size={15} strokeWidth={2} />
                <TextInput
                  type="text"
                  placeholder="Room name, host, or code"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </InputShell>
            </Field>
          </RoomsToolbar>

          {filteredRooms.length > 0 ? (
            <RoomList>
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onJoinRoom={joinPublicRoom}
                />
              ))}
            </RoomList>
          ) : (
            <RoomListEmpty component="p" variant="body2">
              {errorMessage || "No rooms match your search."}
            </RoomListEmpty>
          )}

          <RoomsToolbar>
            <Field component="label">
              <FieldLabel component="span">Join by code</FieldLabel>
              <InlineField>
                <JoinCodeInputShell>
                  <Ticket size={15} strokeWidth={2} />
                  <TextInput
                    type="text"
                    placeholder="AI-7QK9"
                    value={roomCode}
                    onChange={(event) => setRoomCode(event.target.value)}
                  />
                </JoinCodeInputShell>
                <JoinCodeButton
                  type="button"
                  variant="contained"
                  startIcon={<LogIn size={14} strokeWidth={2} />}
                  onClick={handleJoinByCode}
                >
                  Join
                </JoinCodeButton>
              </InlineField>
            </Field>
          </RoomsToolbar>
        </RoomsPanel>

        <LobbySidebar component="aside">
          <CreateRoomPanel />
        </LobbySidebar>
      </LobbyLayout>
    </LobbyMain>
  );
}

export default LobbyPage;
