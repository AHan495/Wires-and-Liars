import { Search, Ticket, LogIn } from 'lucide-react'
import { useState } from 'react'
import CreateRoomPanel from '../components/CreateRoomPanel'
import RoomCard from '../components/RoomCard'

const sampleRooms = [
  {
    id: 'AI-7QK9',
    name: 'Example 1',
    host: 'User 1',
    players: 1,
    public: true,
  },
  {
    id: 'ZX-2LM4',
    name: 'Example 2',
    host: 'User 2',
    players: 0,
    public: true,
  },
  {
    id: 'MN-5TR8',
    name: 'Example 3',
    host: 'User 3',
    players: 1,
    public: true,
  },
  {
    id: 'QP-8DS1',
    name: 'Example 4',
    host: 'User 4',
    players: 1,
    public: true,
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
              <h2>Public Rooms</h2>
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
          </div>

          <div className="room-list">
            {sampleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="rooms-toolbar">
            <label className="field field-code">
                <span>Join by code</span>
                <div className="inline-field">
                  <div className="input-shell col-10">
                    <Ticket size={15} strokeWidth={2} />
                    <input type="text" placeholder="AI-7QK9" />
                  </div>
                  <button type="button" className="button button-primary col-2">
                    <LogIn size={14} strokeWidth={2} />
                    Join
                  </button>
                </div>
            </label>
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
