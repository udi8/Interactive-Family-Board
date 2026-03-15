import { useState, useEffect, useCallback } from 'react';
import type { WeatherData, LocationData } from '../types';
import { fetchWeather, searchCity } from '../services/weatherService';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(() => {
    const saved = localStorage.getItem('family-board-location');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (loc: LocationData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(loc.latitude, loc.longitude);
      data.locationName = loc.name;
      setWeather(data);
    } catch {
      setError('שגיאה בטעינת מזג האוויר');
    } finally {
      setLoading(false);
    }
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('הדפדפן לא תומך באיתור מיקום');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: LocationData = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: 'המיקום שלי',
        };
        setLocation(loc);
        localStorage.setItem('family-board-location', JSON.stringify(loc));
        loadWeather(loc);
      },
      () => setError('לא ניתן לזהות מיקום')
    );
  }, [loadWeather]);

  const setCity = useCallback(async (cityName: string) => {
    setLoading(true);
    try {
      const loc = await searchCity(cityName);
      if (loc) {
        setLocation(loc);
        localStorage.setItem('family-board-location', JSON.stringify(loc));
        await loadWeather(loc);
      } else {
        setError('עיר לא נמצאה');
      }
    } catch {
      setError('שגיאה בחיפוש עיר');
    } finally {
      setLoading(false);
    }
  }, [loadWeather]);

  useEffect(() => {
    if (location) {
      loadWeather(location);
      const interval = setInterval(() => loadWeather(location), 30 * 60 * 1000);
      return () => clearInterval(interval);
    } else {
      detectLocation();
    }
  }, [location, loadWeather, detectLocation]);

  return { weather, loading, error, detectLocation, setCity, location };
}
