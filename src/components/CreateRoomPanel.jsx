import { Globe, Lock, Plus } from 'lucide-react'
import { useState } from 'react'

function CreateRoomPanel() {
  const [isPrivate, setIsPrivate] = useState(false);
  
  return (
    <section className="panel">
      <header className="panel-header">
        <div className="panel-title">
          <h2>Room Setup</h2>
        </div>
      </header>

      <div className="panel-body stack">
        <label className="field">
          <span>Room name</span>
          <div className="input-shell">
            <input type="text" placeholder="Enter room name" required />
          </div>
        </label>

        <div className="field">
          <span>Visibility</span>
          <div className="switch-field">
            {/* Toggles the display */}
            {!isPrivate ? (
              <span className='switch-label switch-label-active'>
                <Globe size={14} strokeWidth={2} color='#27a656' />
                Public
              </span>
            ) : (
              <span className={isPrivate ? 'switch-label switch-label-active' : 'switch-label'}>
                <Lock size={14} strokeWidth={2} color='#c04b4b'/>
                Private
              </span>
            )}
            <button
              type="button"
              className={`switch${isPrivate ? ' switch-private' : ''}`}
              aria-label="Toggle room visibility"
              aria-pressed={isPrivate}
              onClick={() => setIsPrivate(!isPrivate)}
            >
              <span className="switch-track">
                <span className="switch-thumb" />
              </span>
            </button>
          </div>
        </div>

        <label className="field">
          <span>Mode notes</span>
          <div className="textarea-shell">
            <textarea
              rows="4"
              placeholder="Optional copy, rules, or room description."
            />
          </div>
        </label>

        <button type="button" className="button button-primary button-block">
          <Plus size={14} strokeWidth={2} />
          Create room
        </button>
      </div>
    </section>
  )
}

export default CreateRoomPanel
