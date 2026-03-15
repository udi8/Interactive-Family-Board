import { useLocalStorage } from '../hooks/useLocalStorage';
import type { WeeklyMenuData } from '../types';
import { UtensilsCrossed } from 'lucide-react';

const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const emptyMenu: WeeklyMenuData = Object.fromEntries(
  DAY_KEYS.map((key) => [key, { breakfast: '', lunch: '', dinner: '' }])
);

export function WeeklyMenu() {
  const [menu, setMenu] = useLocalStorage<WeeklyMenuData>('family-board-menu', emptyMenu);

  const today = new Date().getDay();

  const updateMeal = (dayKey: string, meal: 'breakfast' | 'lunch' | 'dinner', value: string) => {
    setMenu((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], [meal]: value },
    }));
  };

  return (
    <div className="widget weekly-menu">
      <div className="widget-header">
        <h3><UtensilsCrossed size={18} /> תפריט שבועי</h3>
      </div>
      <div className="menu-table">
        <div className="menu-header-row">
          <span className="menu-day-header">יום</span>
          <span className="menu-meal-header">בוקר</span>
          <span className="menu-meal-header">צהריים</span>
          <span className="menu-meal-header">ערב</span>
        </div>
        {DAY_KEYS.map((key, i) => (
          <div key={key} className={`menu-row ${today === i ? 'today' : ''}`}>
            <span className="menu-day">{DAYS[i]}</span>
            <input
              className="menu-input"
              value={menu[key]?.breakfast || ''}
              onChange={(e) => updateMeal(key, 'breakfast', e.target.value)}
              placeholder="—"
            />
            <input
              className="menu-input"
              value={menu[key]?.lunch || ''}
              onChange={(e) => updateMeal(key, 'lunch', e.target.value)}
              placeholder="—"
            />
            <input
              className="menu-input"
              value={menu[key]?.dinner || ''}
              onChange={(e) => updateMeal(key, 'dinner', e.target.value)}
              placeholder="—"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
