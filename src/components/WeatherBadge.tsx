import { useNavigate } from 'react-router-dom';
import { useWeatherContext } from '../contexts/WeatherContext';
import { getWeatherIcon, getWeatherDescription } from '../services/weatherService';

export function WeatherBadge() {
  const { weather, loading, error } = useWeatherContext();
  const navigate = useNavigate();

  if (loading) return <div className="weather-badge">טוען...</div>;
  if (error || !weather) return <div className="weather-badge" onClick={() => navigate('/weather')}>🌤️ --°</div>;

  const { temperature, weatherCode, isDay } = weather.current;
  const icon = getWeatherIcon(weatherCode, isDay);
  const desc = getWeatherDescription(weatherCode);

  return (
    <div className="weather-badge" onClick={() => navigate('/weather')} title="לחץ לתחזית 5 ימים">
      <span className="weather-icon">{icon}</span>
      <span className="weather-temp">{Math.round(temperature)}°C</span>
      <span className="weather-desc">{desc}</span>
    </div>
  );
}
