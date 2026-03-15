import { useState } from 'react';
import { useShopping } from '../contexts/ShoppingContext';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';

export function ShoppingList() {
  const { items, addItem, toggleItem, removeItem, clearChecked } = useShopping();
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      addItem(newItem);
      setNewItem('');
    }
  };

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);

  return (
    <div className="widget shopping-list">
      <div className="widget-header">
        <h3><ShoppingCart size={18} /> רשימת קניות</h3>
        {checked.length > 0 && (
          <button className="btn-text" onClick={clearChecked}>נקה סומנו ({checked.length})</button>
        )}
      </div>
      <div className="shopping-input">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="הוסף פריט..."
        />
        <button className="btn-icon" onClick={handleAdd}><Plus size={18} /></button>
      </div>
      <ul className="shopping-items">
        {unchecked.map((item) => (
          <li key={item.id} className="shopping-item">
            <label>
              <input type="checkbox" checked={false} onChange={() => toggleItem(item.id)} />
              <span>{item.name}</span>
            </label>
            <button className="btn-delete" onClick={() => removeItem(item.id)}><Trash2 size={14} /></button>
          </li>
        ))}
        {checked.map((item) => (
          <li key={item.id} className="shopping-item checked">
            <label>
              <input type="checkbox" checked onChange={() => toggleItem(item.id)} />
              <span>{item.name}</span>
            </label>
            <button className="btn-delete" onClick={() => removeItem(item.id)}><Trash2 size={14} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
