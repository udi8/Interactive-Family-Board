export interface FamilyMember {
  id: string;
  name: string;
  emoji: string;
  color: string;
  stars: number;
  tasks: Task[];
  schedule: ScheduleEvent[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignedTo: string;
  createdAt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  memberId: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  addedAt: string;
}

export interface Message {
  id: string;
  text: string;
  author: string;
  authorEmoji: string;
  createdAt: string;
  pinned: boolean;
}

export interface MenuItem {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface WeeklyMenuData {
  [day: string]: MenuItem;
}

export interface BirthdayEvent {
  id: string;
  name: string;
  date: string;
  emoji: string;
  recurring: boolean;
}

export interface WeatherData {
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    isDay: boolean;
  };
  daily: DailyForecast[];
  locationName: string;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
}
