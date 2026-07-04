import { Eye, KeyRound, LogIn, Radio, UserRound } from 'lucide-react'

function RoomCard({ room }) {
  const visibilityClass =
    room.visibility === 'Public' ? 'badge badge-public' : 'badge badge-private'

  return (
    <article className={`room-card${room.featured ? ' room-card-featured' : ''}`}>
      <div className="room-card-main">
        <div className="room-card-heading">
          <span className="room-card-icon">
            <Radio size={14} strokeWidth={2} />
          </span>
          <h3>{room.name}</h3>
          <span className={visibilityClass}>{room.visibility}</span>
        </div>
        <div className="room-card-meta">
          <span className="meta-item">
            <UserRound size={13} strokeWidth={2} />
            {room.players}
          </span>
          <span className="meta-item">
            <Radio size={13} strokeWidth={2} />
            Host: {room.host}
          </span>
          <span className="meta-item">
            <KeyRound size={13} strokeWidth={2} />
            Code: {room.id}
          </span>
        </div>
      </div>

      <div className="room-card-actions">
        <button type="button" className="button button-primary button-translucent">
          <LogIn size={14} strokeWidth={2} />
          Join room
        </button>
        <button type="button" className="button button-ghost button-translucent">
          <Eye size={14} strokeWidth={2} />
          Preview
        </button>
      </div>
    </article>
  )
}

export default RoomCard
