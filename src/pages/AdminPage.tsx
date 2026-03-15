import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFamily } from '../contexts/FamilyContext';
import { ArrowRight, Plus, Trash2, Edit3, Check, X } from 'lucide-react';

const EMOJI_OPTIONS = ['👨', '👩', '👦', '👧', '👶', '🧒', '🧑', '👴', '👵', '🐕', '🐈'];
const COLOR_OPTIONS = ['#A8D8EA', '#FFB6C1', '#D5AAFF', '#B5EAD7', '#FFF3B0', '#FFD1A4', '#C7CEEA'];

export function AdminPage() {
  const navigate = useNavigate();
  const { members, addMember, removeMember, updateMember } = useFamily();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('👤');
  const [color, setColor] = useState('#A8D8EA');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    addMember({ name: name.trim(), emoji, color });
    setName('');
    setEmoji('👤');
  };

  const startEdit = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;
    setEditingId(id);
    setEditName(member.name);
    setEditEmoji(member.emoji);
    setEditColor(member.color);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateMember(editingId, { name: editName.trim(), emoji: editEmoji, color: editColor });
      setEditingId(null);
    }
  };

  return (
    <div className="admin-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowRight size={20} /> חזרה ללוח
      </button>

      <h2>⚙️ ניהול בני המשפחה</h2>

      <div className="admin-add-form">
        <h3><Plus size={18} /> הוספת בן/בת משפחה</h3>
        <div className="form-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="שם"
            className="input-name"
          />
        </div>
        <div className="form-row">
          <label>אימוג'י:</label>
          <div className="emoji-picker">
            {EMOJI_OPTIONS.map((e) => (
              <button key={e} className={`emoji-btn ${emoji === e ? 'selected' : ''}`} onClick={() => setEmoji(e)}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label>צבע:</label>
          <div className="color-picker">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                className={`color-btn ${color === c ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <Plus size={16} /> הוסף
        </button>
      </div>

      <div className="admin-members-list">
        <h3>בני המשפחה ({members.length})</h3>
        {members.map((member) => (
          <div key={member.id} className="admin-member-item" style={{ borderRightColor: member.color }}>
            {editingId === member.id ? (
              <div className="edit-member-form">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="input-name" />
                <div className="emoji-picker-small">
                  {EMOJI_OPTIONS.map((e) => (
                    <button key={e} className={`emoji-btn-sm ${editEmoji === e ? 'selected' : ''}`} onClick={() => setEditEmoji(e)}>
                      {e}
                    </button>
                  ))}
                </div>
                <div className="color-picker-small">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      className={`color-btn-sm ${editColor === c ? 'selected' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setEditColor(c)}
                    />
                  ))}
                </div>
                <div className="edit-actions">
                  <button className="btn-icon" onClick={saveEdit}><Check size={16} /></button>
                  <button className="btn-icon" onClick={() => setEditingId(null)}><X size={16} /></button>
                </div>
              </div>
            ) : (
              <>
                <span className="member-info">
                  <span className="member-emoji-sm">{member.emoji}</span>
                  <span>{member.name}</span>
                </span>
                <div className="member-actions">
                  <button className="btn-icon" onClick={() => startEdit(member.id)}>
                    <Edit3 size={16} />
                  </button>
                  <button className="btn-icon btn-danger" onClick={() => removeMember(member.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {members.length === 0 && <p className="empty-state">עדיין לא הוספתם בני משפחה</p>}
      </div>
    </div>
  );
}
