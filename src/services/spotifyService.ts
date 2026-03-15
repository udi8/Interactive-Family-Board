// Spotify Web Playback SDK Integration
// Requires Spotify Client ID configured in Settings

export async function initSpotify(_clientId: string): Promise<boolean> {
  try {
    await loadSpotifyScript();
    return true;
  } catch {
    return false;
  }
}

function loadSpotifyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('spotify-sdk')) { resolve(); return; }
    const script = document.createElement('script');
    script.id = 'spotify-sdk';
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Spotify SDK'));
    document.head.appendChild(script);
  });
}

export function createPlayer(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = new (window as any).Spotify.Player({
    name: 'לוח המשפחה',
    getOAuthToken: (cb: (token: string) => void) => cb(token),
    volume: 0.5,
  });
  return player;
}
