import { Search, Ticket, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomPanel from "../components/CreateRoomPanel";
import RoomCard from "../components/RoomCard";
import { sampleRooms } from "../data/rooms";
import "../styles/lobby-page.css";
import "../styles/cols.css";

function LobbyPage() {
  // Use React Router hooks to access navigation and location state
  const navigate = useNavigate();

  // Will add useEffect when we implement API calls (useState is enought to rerender for now)
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
    <main className="lobby-page">
      <section className="lobby-layout" aria-label="Lobby layout">
        <section className="panel rooms-panel">
          <header className="panel-header">
            <div>
              <h2>Public Rooms</h2>
            </div>
          </header>

          <div className="rooms-toolbar">
            <label className="field field-search">
              <span>Search rooms</span>
              <div className="input-shell">
                <Search size={15} strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Room name, host, or code"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>
            </label>
          </div>

          {filteredRooms.length > 0 ? (
            <div className="room-list">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <p className="room-list-empty">No rooms match your search.</p>
          )}

          <div className="rooms-toolbar">
            <label className="field field-code">
              <span>Join by code</span>
              <div className="inline-field">
                <div className="input-shell col-10">
                  <Ticket size={15} strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="AI-7QK9"
                    value={roomCode}
                    onChange={(event) => setRoomCode(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="button button-primary join-code-button col-2"
                  onClick={handleJoinByCode}
                >
                  <LogIn size={14} strokeWidth={2} />
                  Join
                </button>
              </div>
            </label>
          </div>
        </section>

        <aside className="lobby-sidebar">
          <CreateRoomPanel onCreateRoom={openRoom} />
        </aside>
      </section>
    </main>
  );
}

export default LobbyPage;
