import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { SpotifyMiniPlayer } from './SpotifyMiniPlayer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <TopBar />
      <main className="main-content">
        {children}
      </main>
      <SpotifyMiniPlayer />
    </div>
  );
}
