import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFamily } from '../contexts/FamilyContext';
import { StarRating } from '../components/StarRating';
import { ArrowRight, Plus, Trash2, Clock, CheckSquare, Star } from 'lucide-react';

export function MemberPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { members, addTask, toggleTask, removeTask, addScheduleEvent, removeScheduleEvent, updateStars } = useFamily();
  const member = members.find((m) => m.id === id);

  const [newTask, setNewTask] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');

  if (!member) {
    return (
      <div className="member-page">
        <button className="btn-back" onClick={() => navigate('/')}><ArrowRight size={20} /> חזרה</button>
        <p>חבר משפחה לא נמצא</p>
      </div>
    );
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(member.id, newTask.trim());
      setNewTask('');
    }
  };

  const handleAddEvent = () => {
    if (newEventTitle.trim() && newEventTime) {
      addScheduleEvent(member.id, { title: newEventTitle.trim(), time: newEventTime, endTime: newEventEndTime || undefined });
      setNewEventTitle('');
      setNewEventTime('');
      setNewEventEndTime('');
    }
  };

  const sortedSchedule = [...member.schedule].sort((a, b) => a.time.localeCompare(b.time));
  const pendingTasks = member.tasks.filter((t) => !t.completed);
  const completedTasks = member.tasks.filter((t) => t.completed);

  return (
    <div className="member-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowRight size={20} /> חזרה ללוח
      </button>

      <div className="member-header" style={{ borderColor: member.color }}>
        <span className="member-page-emoji">{member.emoji}</span>
        <h2>{member.name}</h2>
      </div>

      {/* Stars Section */}
      <section className="member-section stars-section">
        <h3><Star size={18} /> כוכבי התנהגות</h3>
        <StarRating stars={member.stars} onUpdate={(s) => updateStars(member.id, s)} />
      </section>

      {/* Schedule Section */}
      <section className="member-section">
        <h3><Clock size={18} /> לוז היום</h3>
        <div className="add-form">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="אירוע חדש..."
          />
          <input
            type="time"
            value={newEventTime}
            onChange={(e) => setNewEventTime(e.target.value)}
          />
          <input
            type="time"
            value={newEventEndTime}
            onChange={(e) => setNewEventEndTime(e.target.value)}
            placeholder="סיום"
          />
          <button className="btn-icon" onClick={handleAddEvent}><Plus size={18} /></button>
        </div>
        <div className="schedule-list">
          {sortedSchedule.length === 0 && <p className="empty-state">אין אירועים מתוכננים להיום</p>}
          {sortedSchedule.map((event) => (
            <div key={event.id} className="schedule-item">
              <div className="schedule-time">
                {event.time}
                {event.endTime && ` - ${event.endTime}`}
              </div>
              <div className="schedule-title">{event.title}</div>
              <button className="btn-delete" onClick={() => removeScheduleEvent(member.id, event.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section className="member-section">
        <h3><CheckSquare size={18} /> משימות בבית</h3>
        <div className="add-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="משימה חדשה..."
          />
          <button className="btn-icon" onClick={handleAddTask}><Plus size={18} /></button>
        </div>
        <div className="tasks-list">
          {pendingTasks.map((task) => (
            <div key={task.id} className="task-item">
              <label>
                <input type="checkbox" checked={false} onChange={() => toggleTask(member.id, task.id)} />
                <span>{task.title}</span>
              </label>
              <button className="btn-delete" onClick={() => removeTask(member.id, task.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {completedTasks.map((task) => (
            <div key={task.id} className="task-item completed">
              <label>
                <input type="checkbox" checked onChange={() => toggleTask(member.id, task.id)} />
                <span>{task.title}</span>
              </label>
              <button className="btn-delete" onClick={() => removeTask(member.id, task.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {member.tasks.length === 0 && <p className="empty-state">אין משימות עדיין</p>}
        </div>
      </section>
    </div>
  );
}
