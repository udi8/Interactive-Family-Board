import { useNavigate } from 'react-router-dom';
import { useFamily } from '../contexts/FamilyContext';
import { FamilyMemberCard } from '../components/FamilyMemberCard';
import { ShoppingList } from '../components/ShoppingList';
import { MessageBoard } from '../components/MessageBoard';
import { WeeklyMenu } from '../components/WeeklyMenu';
import { BirthdayWidget } from '../components/BirthdayWidget';
import { TimerWidget } from '../components/TimerWidget';
import { Settings, UserPlus } from 'lucide-react';

export function HomePage() {
  const { members } = useFamily();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>🏠 לוח המשפחה</h2>
        <div className="home-actions">
          <button className="btn-secondary" onClick={() => navigate('/admin')}>
            <UserPlus size={16} /> ניהול
          </button>
          <button className="btn-secondary" onClick={() => navigate('/settings')}>
            <Settings size={16} /> הגדרות
          </button>
        </div>
      </div>

      <section className="family-section">
        <h3>👨‍👩‍👧‍👦 בני המשפחה</h3>
        <div className="family-grid">
          {members.map((member) => (
            <FamilyMemberCard key={member.id} member={member} />
          ))}
          {members.length === 0 && (
            <div className="empty-card" onClick={() => navigate('/admin')}>
              <UserPlus size={32} />
              <p>הוסיפו בני משפחה</p>
            </div>
          )}
        </div>
      </section>

      <div className="home-widgets">
        <div className="widgets-column">
          <ShoppingList />
          <MessageBoard />
        </div>
        <div className="widgets-column">
          <WeeklyMenu />
          <BirthdayWidget />
          <TimerWidget />
        </div>
      </div>
    </div>
  );
}
