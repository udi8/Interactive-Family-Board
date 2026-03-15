import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { BirthdayEvent } from '../types';
import { Cake, Plus, Trash2, Gift } from 'lucide-react';

export function BirthdayWidget() {
  const [events, setEvents] = useLocalStorage<BirthdayEvent[]>('family-board-birthdays', []);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [emoji, setEmoji] = useState('🎂');

  const addEvent = () => {
    if (!name.trim() || !date) return;
    setEvents((prev) => [
      ...prev,
      { id: Date.now().toString(), name: name.trim(), date, emoji, recurring: true },
    ]);
    setName('');
    setDate('');
    setEmoji('🎂');
    setShowForm(false);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    const eventDate = new Date(dateStr);
    eventDate.setFullYear(today.getFullYear());
    if (eventDate < today) {
      eventDate.setFullYear(today.getFullYear() + 1);
    }
    const diff = eventDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const sorted = [...events].sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date));

  return (
    <div className="widget birthday-widget">
      <div className="widget-header">
        <h3><Gift size={18} /> ימי הולדת ואירועים</h3>
        <button className="btn-icon" onClick={() => setShowForm(!showForm)}><Plus size={16} /></button>
      </div>
      {showForm && (
        <div className="birthday-form">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="שם / אירוע" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
            <option value="🎂">🎂</option>
            <option value="🎉">🎉</option>
            <option value="🎊">🎊</option>
            <option value="💍">💍</option>
            <option value="🎓">🎓</option>
            <option value="✈️">✈️</option>
          </select>
          <button className="btn-primary" onClick={addEvent}>הוסף</button>
        </div>
      )}
      <div className="birthday-list">
        {sorted.slice(0, 5).map((event) => {
          const days = getDaysUntil(event.date);
          return (
            <div key={event.id} className={`birthday-item ${days <= 7 ? 'soon' : ''}`}>
              <span className="birthday-emoji">{event.emoji}</span>
              <div className="birthday-info">
                <span className="birthday-name">{event.name}</span>
                <span className="birthday-date">
                  {new Date(event.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <span className="birthday-countdown">
                {days === 0 ? 'היום! 🎉' : days === 1 ? 'מחר!' : `עוד ${days} ימים`}
              </span>
              <button className="btn-delete" onClick={() => removeEvent(event.id)}>
                <Trash2 size={12} />
              </button>
            </div>
          );
        })}
        {events.length === 0 && (
          <p className="empty-state">
            <Cake size={24} />
            <br />הוסיפו ימי הולדת ואירועים!
          </p>
        )}
      </div>
    </div>
  );
}
