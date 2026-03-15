import type { WeatherData, LocationData } from '../types';

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error');
  const data = await res.json();

  return {
    current: {
      temperature: data.current_weather.temperature,
      weatherCode: data.current_weather.weathercode,
      windSpeed: data.current_weather.windspeed,
      isDay: data.current_weather.is_day === 1,
    },
    daily: data.daily.time.map((date: string, i: number) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weathercode[i],
    })),
    locationName: '',
  };
}

export async function searchCity(name: string): Promise<LocationData | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=he`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const result = data.results[0];
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
  };
}

export function getWeatherIcon(code: number, isDay: boolean = true): string {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code <= 3) return isDay ? '⛅' : '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 57) return '🌦️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '🌨️';
  if (code <= 82) return '🌧️';
  if (code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '☁️';
}

export function getWeatherDescription(code: number): string {
  if (code === 0) return 'בהיר';
  if (code <= 3) return 'מעונן חלקית';
  if (code <= 48) return 'ערפל';
  if (code <= 57) return 'טפטוף';
  if (code <= 67) return 'גשם';
  if (code <= 77) return 'שלג';
  if (code <= 82) return 'גשם חזק';
  if (code <= 86) return 'שלג כבד';
  if (code >= 95) return 'סופת רעמים';
  return 'מעונן';
}
