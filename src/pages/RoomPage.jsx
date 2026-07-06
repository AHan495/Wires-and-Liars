import { ArrowLeft, Play, Radio, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRoomFromLocationState } from "../utils/roomState";
import "../styles/room-page.css";

function RoomPage() {
  const navigate = useNavigate();
  const room = useRoomFromLocationState();
  const slotsLeft = Math.max(0, 2 - room.players);

  return (
    <main className="room-page">
      <section className="room-shell panel">
        <header className="room-header">
          <button
            type="button"
            className="button button-ghost col-2"
            onClick={() => navigate("/lobby")}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to lobby
          </button>
        </header>

        <section className="room-hero">
          <div className="room-hero-copy">
            <p className="room-eyebrow">Room Lobby</p>
            <h1>{room.name || "Untitled Room"}</h1>
            <p>
              Share the room code with another player and start when everyone is
              ready.
            </p>
          </div>

          <div className="room-code-card">
            <span className="room-code-label">Room code</span>
            <strong>{room.id}</strong>
            <span className="room-code-visibility">
              {room.public ? "Public room" : "Private room"}
            </span>
          </div>
        </section>

        <section className="room-grid">
          <article className="panel room-detail-card">
            <div className="room-detail-heading">
              <Radio size={16} strokeWidth={2} />
              <h2>Room details</h2>
            </div>

            <div className="room-detail-list">
              <div className="room-detail-item">
                <span>Host</span>
                <strong>{room.host}</strong>
              </div>
              <div className="room-detail-item">
                <span>Players joined</span>
                <strong>{room.players} / 2</strong>
              </div>
              <div className="room-detail-item">
                <span>Open slots</span>
                <strong>{slotsLeft}</strong>
              </div>
            </div>
          </article>

          <article className="panel room-detail-card">
            <div className="room-detail-heading">
              <Users size={16} strokeWidth={2} />
              <h2>Players</h2>
            </div>

            <div className="room-player-list">
              <div className="room-player-card room-player-card-active">
                <span className="room-player-name">{room.host}</span>
                <span className="room-player-role">Host</span>
              </div>
              <div className="room-player-card room-player-card-empty">
                <span className="room-player-name">Waiting for player 2</span>
                <span className="room-player-role">Open slot</span>
              </div>
            </div>
          </article>
        </section>

        <footer className="room-actions">
          <button
            type="button"
            className="button button-primary col-2"
            onClick={() => navigate("/match", { state: { room } })}
          >
            <Play size={14} strokeWidth={2} />
            Start
          </button>
        </footer>
      </section>
    </main>
  );
}

export default RoomPage;
