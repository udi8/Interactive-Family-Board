import { useNavigate } from 'react-router-dom';
import type { FamilyMember } from '../types';
import { Star, CheckSquare } from 'lucide-react';

interface Props {
  member: FamilyMember;
}

export function FamilyMemberCard({ member }: Props) {
  const navigate = useNavigate();
  const pendingTasks = member.tasks.filter((t) => !t.completed).length;

  return (
    <div
      className="member-card"
      onClick={() => navigate(`/member/${member.id}`)}
      style={{ borderColor: member.color }}
    >
      <div className="member-emoji">{member.emoji}</div>
      <div className="member-name">{member.name}</div>
      <div className="member-stats">
        <span className="stat">
          <Star size={14} fill="#FFD700" color="#FFD700" />
          {member.stars}
        </span>
        <span className="stat">
          <CheckSquare size={14} />
          {pendingTasks} משימות
        </span>
      </div>
    </div>
  );
}
