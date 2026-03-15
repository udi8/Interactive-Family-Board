import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Clock } from 'lucide-react';

type Mode = 'timer' | 'stopwatch';

const PRESETS = [
  { label: '1 דק\'', seconds: 60 },
  { label: '5 דק\'', seconds: 300 },
  { label: '10 דק\'', seconds: 600 },
  { label: '15 דק\'', seconds: 900 },
  { label: '30 דק\'', seconds: 1800 },
];

export function TimerWidget() {
  const [mode, setMode] = useState<Mode>('timer');
  const [seconds, setSeconds] = useState(0);
  const [targetSeconds, setTargetSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          if (mode === 'timer') {
            if (prev <= 1) {
              setRunning(false);
              setFinished(true);
              try {
                audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGczIj6markup=');
                // Simple beep using Web Audio API
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                osc.frequency.value = 800;
                osc.connect(ctx.destination);
                osc.start();
                setTimeout(() => { osc.stop(); ctx.close(); }, 500);
              } catch { /* ignore audio errors */ }
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  const reset = () => {
    setRunning(false);
    setFinished(false);
    setSeconds(mode === 'timer' ? targetSeconds : 0);
  };

  const selectPreset = (secs: number) => {
    setTargetSeconds(secs);
    setSeconds(secs);
    setRunning(false);
    setFinished(false);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setRunning(false);
    setFinished(false);
    setSeconds(newMode === 'timer' ? targetSeconds : 0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const displaySeconds = mode === 'timer' ? seconds : seconds;

  return (
    <div className={`widget timer-widget ${finished ? 'timer-finished' : ''}`}>
      <div className="widget-header">
        <h3><Timer size={18} /> טיימר / שעון עצר</h3>
        <div className="timer-mode-switch">
          <button className={mode === 'timer' ? 'active' : ''} onClick={() => switchMode('timer')}>
            <Timer size={14} /> טיימר
          </button>
          <button className={mode === 'stopwatch' ? 'active' : ''} onClick={() => switchMode('stopwatch')}>
            <Clock size={14} /> שעון עצר
          </button>
        </div>
      </div>
      {mode === 'timer' && !running && (
        <div className="timer-presets">
          {PRESETS.map((p) => (
            <button
              key={p.seconds}
              className={`preset-btn ${targetSeconds === p.seconds ? 'active' : ''}`}
              onClick={() => selectPreset(p.seconds)}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      <div className="timer-display">
        <span className={`timer-time ${finished ? 'blink' : ''}`}>{formatTime(displaySeconds)}</span>
      </div>
      <div className="timer-controls">
        <button className="btn-icon" onClick={() => { setRunning(!running); setFinished(false); }}>
          {running ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className="btn-icon" onClick={reset}>
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
