import { Search, Ticket } from 'lucide-react'
import { useState } from 'react'
import CreateRoomPanel from '../components/CreateRoomPanel'
import RoomCard from '../components/RoomCard'

const sampleRooms = [
  {
    id: 'AI-7QK9',
    name: 'Night Shift Interrogation',
    host: 'Blue',
    players: '1 / 2 players',
    visibility: 'Public',
    featured: true,
  },
  {
    id: 'ZX-2LM4',
    name: 'Signal Checkpoint',
    host: 'Green',
    players: '0 / 2 players',
    visibility: 'Public',
  },
  {
    id: 'MN-5TR8',
    name: 'False Memory Trial',
    host: 'Yellow',
    players: '1 / 2 players',
    visibility: 'Private',
  },
  {
    id: 'QP-8DS1',
    name: 'Afterimage Debate',
    host: 'Violet',
    players: '1 / 2 players',
    visibility: 'Public',
  },
]

function LobbyPage() {
  const [isPrivate, setIsPrivate] = useState(false)

  return (
    <main className="lobby-page">
      <section className="lobby-layout" aria-label="Lobby layout">
        <section className="panel rooms-panel">
          <header className="panel-header">
            <div>
              <h2>Open rooms</h2>
            </div>
          </header>

          <div className="rooms-toolbar">
            <label className="field field-search">
              <span>Search rooms</span>
              <div className="input-shell">
                <Search size={15} strokeWidth={2} />
                <input type="text" placeholder="Room name or host" />
              </div>
            </label>
            <label className="field field-code">
              <span>Join by code</span>
              <div className="inline-field">
                <div className="input-shell">
                  <Ticket size={15} strokeWidth={2} />
                  <input type="text" placeholder="AI-7QK9" />
                </div>
                <button type="button" className="button button-primary">
                  Join
                </button>
              </div>
            </label>
          </div>

          <div className="room-list">
            {sampleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>

        <aside className="lobby-sidebar">
          <CreateRoomPanel
            isPrivate={isPrivate}
            onTogglePrivate={() => setIsPrivate((value) => !value)}
          />
        </aside>
      </section>
    </main>
  )
}

export default LobbyPage
