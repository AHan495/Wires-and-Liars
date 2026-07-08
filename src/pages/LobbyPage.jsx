import { Search, Ticket, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomPanel from "../components/LobbyPage/CreateRoomPanel";
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
} from "../components/LobbyPage/LobbyPage.styles";
import RoomCard from "../components/LobbyPage/RoomCard";
import { sampleRooms } from "../data/rooms";

function LobbyPage() {
  // Use React Router hooks to access navigation and location state
  const navigate = useNavigate();

  // Will add useEffect when we implement API calls (useState is enough to rerender for now)
  const [searchText, setSearchText] = useState("");
  const [roomCode, setRoomCode] = useState("");

  // Normalize the search text for case-insensitive matching
  const normalizedSearch = searchText.trim().toLowerCase();

  // Filter rooms based on search text
  const filteredRooms = sampleRooms.filter((room) => {
    if (!normalizedSearch) return true;

    return [room.name, room.host, room.id].some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    );
  });

  // Function to navigate to the room page with the selected room
  function openRoom(room) {
    navigate("/room", { state: { room } });
  }

  // Function to handle joining a room by code
  function handleJoinByCode() {
    const normalizedCode = roomCode.trim().toUpperCase();
    const matchedRoom = sampleRooms.find(
      (room) => room.id.toUpperCase() === normalizedCode,
    );

    if (matchedRoom) {
      openRoom(matchedRoom);
    }

    return;
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
                <RoomCard key={room.id} room={room} />
              ))}
            </RoomList>
          ) : (
            <RoomListEmpty component="p" variant="body2">
              No rooms match your search.
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
          <CreateRoomPanel onCreateRoom={openRoom} />
        </LobbySidebar>
      </LobbyLayout>
    </LobbyMain>
  );
}

export default LobbyPage;
