import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ShoppingItem } from '../types';

interface ShoppingContextType {
  items: ShoppingItem[];
  addItem: (name: string) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearChecked: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | null>(null);

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('family-board-shopping', []);

  const addItem = (name: string) => {
    if (!name.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: name.trim(), checked: false, addedAt: new Date().toISOString() },
    ]);
  };

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  return (
    <ShoppingContext.Provider value={{ items, addItem, toggleItem, removeItem, clearChecked }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const ctx = useContext(ShoppingContext);
  if (!ctx) throw new Error('useShopping must be used within ShoppingProvider');
  return ctx;
}
