import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useWeather } from '../hooks/useWeather';
import type { WeatherData, LocationData } from '../types';

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  detectLocation: () => void;
  setCity: (city: string) => Promise<void>;
  location: LocationData | null;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const weatherData = useWeather();
  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeatherContext must be used within WeatherProvider');
  return ctx;
}
