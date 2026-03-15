import { useState } from 'react';
import { Music, Play, SkipForward, SkipBack, X } from 'lucide-react';

export function SpotifyMiniPlayer() {
  const [expanded, setExpanded] = useState(false);
  const [connected, setConnected] = useState(false);
  const spotifyClientId = localStorage.getItem('family-board-spotify-client-id');

  if (!spotifyClientId) {
    return (
      <div className="spotify-fab" onClick={() => setExpanded(!expanded)} title="Spotify - הגדר בהגדרות">
        <Music size={20} />
        {expanded && (
          <div className="spotify-panel">
            <div className="spotify-panel-header">
              <span>🎵 Spotify</span>
              <button onClick={(e) => { e.stopPropagation(); setExpanded(false); }}><X size={14} /></button>
            </div>
            <p className="spotify-setup-msg">
              כדי לחבר Spotify, הגדירו Client ID בעמוד ההגדרות
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="spotify-fab" onClick={() => !expanded && setExpanded(true)}>
      <Music size={20} />
      {expanded && (
        <div className="spotify-panel" onClick={(e) => e.stopPropagation()}>
          <div className="spotify-panel-header">
            <span>🎵 Spotify</span>
            <button onClick={() => setExpanded(false)}><X size={14} /></button>
          </div>
          {!connected ? (
            <button className="btn-primary" onClick={() => setConnected(true)}>
              התחבר ל-Spotify
            </button>
          ) : (
            <div className="spotify-controls">
              <div className="spotify-track">שיר נוכחי</div>
              <div className="spotify-buttons">
                <button><SkipForward size={16} /></button>
                <button><Play size={20} /></button>
                <button><SkipBack size={16} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
