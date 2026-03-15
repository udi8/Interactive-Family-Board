import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeatherContext } from '../contexts/WeatherContext';
import { getWeatherIcon, getWeatherDescription } from '../services/weatherService';
import { ArrowRight, MapPin, Search } from 'lucide-react';

export function WeatherPage() {
  const navigate = useNavigate();
  const { weather, loading, error, setCity, detectLocation, location } = useWeatherContext();
  const [cityInput, setCityInput] = useState('');

  const handleSearch = () => {
    if (cityInput.trim()) {
      setCity(cityInput.trim());
      setCityInput('');
    }
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'היום';
    if (date.toDateString() === tomorrow.toDateString()) return 'מחר';
    return date.toLocaleDateString('he-IL', { weekday: 'long' });
  };

  return (
    <div className="weather-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowRight size={20} /> חזרה ללוח
      </button>

      <h2>🌤️ תחזית מזג האוויר</h2>

      <div className="weather-location">
        <div className="location-current">
          <MapPin size={16} />
          <span>{location?.name || 'לא נקבע מיקום'}</span>
        </div>
        <div className="location-controls">
          <div className="city-search">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="חפש עיר..."
            />
            <button className="btn-icon" onClick={handleSearch}><Search size={16} /></button>
          </div>
          <button className="btn-secondary" onClick={detectLocation}>
            <MapPin size={14} /> זהה מיקום אוטומטי
          </button>
        </div>
      </div>

      {loading && <div className="weather-loading">טוען תחזית...</div>}
      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <>
          <div className="weather-current-card">
            <div className="weather-current-icon">
              {getWeatherIcon(weather.current.weatherCode, weather.current.isDay)}
            </div>
            <div className="weather-current-info">
              <span className="current-temp">{Math.round(weather.current.temperature)}°C</span>
              <span className="current-desc">{getWeatherDescription(weather.current.weatherCode)}</span>
              <span className="current-wind">רוח: {Math.round(weather.current.windSpeed)} קמ"ש</span>
            </div>
          </div>

          <h3>תחזית ל-5 ימים</h3>
          <div className="forecast-grid">
            {weather.daily.map((day) => (
              <div key={day.date} className="forecast-card">
                <div className="forecast-day">{getDayName(day.date)}</div>
                <div className="forecast-date">
                  {new Date(day.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })}
                </div>
                <div className="forecast-icon">{getWeatherIcon(day.weatherCode)}</div>
                <div className="forecast-desc">{getWeatherDescription(day.weatherCode)}</div>
                <div className="forecast-temps">
                  <span className="temp-max">{Math.round(day.temperatureMax)}°</span>
                  <span className="temp-min">{Math.round(day.temperatureMin)}°</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
