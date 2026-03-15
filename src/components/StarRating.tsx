import { Star, Plus, Minus } from 'lucide-react';

interface Props {
  stars: number;
  onUpdate: (stars: number) => void;
  readonly?: boolean;
}

export function StarRating({ stars, onUpdate, readonly }: Props) {
  return (
    <div className="star-rating">
      {!readonly && (
        <button className="btn-icon star-btn" onClick={() => onUpdate(stars - 1)} disabled={stars <= 0}>
          <Minus size={16} />
        </button>
      )}
      <div className="stars-display">
        {Array.from({ length: Math.min(stars, 10) }, (_, i) => (
          <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
        ))}
        {stars > 10 && <span className="star-count">+{stars - 10}</span>}
        {stars === 0 && <span className="no-stars">אין כוכבים עדיין</span>}
      </div>
      {!readonly && (
        <button className="btn-icon star-btn" onClick={() => onUpdate(stars + 1)}>
          <Plus size={16} />
        </button>
      )}
    </div>
  );
}
