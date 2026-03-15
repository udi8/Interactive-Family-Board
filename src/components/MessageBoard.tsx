import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFamily } from '../contexts/FamilyContext';
import type { Message } from '../types';
import { MessageCircle, Pin, Trash2, Send } from 'lucide-react';

export function MessageBoard() {
  const [messages, setMessages] = useLocalStorage<Message[]>('family-board-messages', []);
  const { members } = useFamily();
  const [text, setText] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const addMessage = () => {
    if (!text.trim() || !selectedAuthor) return;
    const member = members.find((m) => m.id === selectedAuthor);
    if (!member) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      author: member.name,
      authorEmoji: member.emoji,
      createdAt: new Date().toISOString(),
      pinned: false,
    };
    setMessages((prev) => [msg, ...prev]);
    setText('');
  };

  const togglePin = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m)));
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const sorted = [...messages].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="widget message-board">
      <div className="widget-header">
        <h3><MessageCircle size={18} /> לוח הודעות</h3>
      </div>
      <div className="message-input">
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">מי כותב?</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>{m.emoji} {m.name}</option>
          ))}
        </select>
        <div className="message-text-row">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMessage()}
            placeholder="כתוב הודעה..."
          />
          <button className="btn-icon" onClick={addMessage}><Send size={16} /></button>
        </div>
      </div>
      <div className="messages-list">
        {sorted.slice(0, 8).map((msg) => (
          <div key={msg.id} className={`message-card ${msg.pinned ? 'pinned' : ''}`}>
            <div className="message-header">
              <span className="message-author">{msg.authorEmoji} {msg.author}</span>
              <div className="message-actions">
                <button onClick={() => togglePin(msg.id)} title={msg.pinned ? 'בטל הצמדה' : 'הצמד'}>
                  <Pin size={12} fill={msg.pinned ? '#FF9AAF' : 'none'} />
                </button>
                <button onClick={() => removeMessage(msg.id)}><Trash2 size={12} /></button>
              </div>
            </div>
            <p className="message-text">{msg.text}</p>
            <span className="message-time">
              {new Date(msg.createdAt).toLocaleString('he-IL', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
            </span>
          </div>
        ))}
        {messages.length === 0 && <p className="empty-state">אין הודעות עדיין. כתבו הודעה למשפחה! 💕</p>}
      </div>
    </div>
  );
}
