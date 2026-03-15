import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Key, Music, Calendar } from 'lucide-react';

export function SettingsPage() {
  const navigate = useNavigate();
  const [googleClientId, setGoogleClientId] = useState(
    () => localStorage.getItem('family-board-google-client-id') || ''
  );
  const [spotifyClientId, setSpotifyClientId] = useState(
    () => localStorage.getItem('family-board-spotify-client-id') || ''
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (googleClientId.trim()) {
      localStorage.setItem('family-board-google-client-id', googleClientId.trim());
    } else {
      localStorage.removeItem('family-board-google-client-id');
    }
    if (spotifyClientId.trim()) {
      localStorage.setItem('family-board-spotify-client-id', spotifyClientId.trim());
    } else {
      localStorage.removeItem('family-board-spotify-client-id');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowRight size={20} /> חזרה ללוח
      </button>

      <h2>⚙️ הגדרות</h2>

      <section className="settings-section">
        <h3><Calendar size={18} /> Google Calendar & Tasks</h3>
        <p className="settings-desc">
          חברו את לוח השנה והמשימות של Google כדי לסנכרן אירועים ומשימות.
          <br />
          צרו Client ID ב-
          <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
            Google Cloud Console
          </a>
        </p>
        <div className="settings-input-row">
          <Key size={16} />
          <input
            type="text"
            value={googleClientId}
            onChange={(e) => setGoogleClientId(e.target.value)}
            placeholder="Google Client ID"
            dir="ltr"
          />
        </div>
      </section>

      <section className="settings-section">
        <h3><Music size={18} /> Spotify</h3>
        <p className="settings-desc">
          חברו Spotify כדי לנגן מוזיקה ברקע.
          <br />
          צרו אפליקציה ב-
          <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">
            Spotify Developer Dashboard
          </a>
        </p>
        <div className="settings-input-row">
          <Key size={16} />
          <input
            type="text"
            value={spotifyClientId}
            onChange={(e) => setSpotifyClientId(e.target.value)}
            placeholder="Spotify Client ID"
            dir="ltr"
          />
        </div>
      </section>

      <button className="btn-primary btn-save" onClick={handleSave}>
        {saved ? '✓ נשמר!' : 'שמור הגדרות'}
      </button>
    </div>
  );
}
