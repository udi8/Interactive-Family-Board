import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { FamilyMember, Task, ScheduleEvent } from '../types';

interface FamilyContextType {
  members: FamilyMember[];
  addMember: (member: Omit<FamilyMember, 'id' | 'stars' | 'tasks' | 'schedule'>) => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
  addTask: (memberId: string, title: string) => void;
  toggleTask: (memberId: string, taskId: string) => void;
  removeTask: (memberId: string, taskId: string) => void;
  addScheduleEvent: (memberId: string, event: Omit<ScheduleEvent, 'id' | 'memberId'>) => void;
  removeScheduleEvent: (memberId: string, eventId: string) => void;
  updateStars: (memberId: string, stars: number) => void;
}

const FamilyContext = createContext<FamilyContextType | null>(null);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useLocalStorage<FamilyMember[]>('family-board-members', []);

  const addMember = (member: Omit<FamilyMember, 'id' | 'stars' | 'tasks' | 'schedule'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: Date.now().toString(),
      stars: 0,
      tasks: [],
      schedule: [],
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, updates: Partial<FamilyMember>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const addTask = (memberId: string, title: string) => {
    const task: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      assignedTo: memberId,
      createdAt: new Date().toISOString(),
    };
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, tasks: [...m.tasks, task] } : m))
    );
  };

  const toggleTask = (memberId: string, taskId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
          : m
      )
    );
  };

  const removeTask = (memberId: string, taskId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, tasks: m.tasks.filter((t) => t.id !== taskId) } : m
      )
    );
  };

  const addScheduleEvent = (memberId: string, event: Omit<ScheduleEvent, 'id' | 'memberId'>) => {
    const newEvent: ScheduleEvent = {
      ...event,
      id: Date.now().toString(),
      memberId,
    };
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, schedule: [...m.schedule, newEvent] } : m
      )
    );
  };

  const removeScheduleEvent = (memberId: string, eventId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, schedule: m.schedule.filter((e) => e.id !== eventId) } : m
      )
    );
  };

  const updateStars = (memberId: string, stars: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, stars: Math.max(0, stars) } : m))
    );
  };

  return (
    <FamilyContext.Provider
      value={{
        members,
        addMember,
        removeMember,
        updateMember,
        addTask,
        toggleTask,
        removeTask,
        addScheduleEvent,
        removeScheduleEvent,
        updateStars,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamily must be used within FamilyProvider');
  return ctx;
}
