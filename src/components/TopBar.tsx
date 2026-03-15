import { useClock } from '../hooks/useClock';
import { WeatherBadge } from './WeatherBadge';

export function TopBar() {
  const { timeString, dateString } = useClock();

  return (
    <div className="top-bar">
      <div className="top-bar-right">
        <div className="clock">{timeString}</div>
        <div className="date">{dateString}</div>
      </div>
      <div className="top-bar-left">
        <WeatherBadge />
      </div>
    </div>
  );
}
