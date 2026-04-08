import { createContext, useState } from 'react';

export const DashboardTitlesContext = createContext<{
  getTitle: (id: string, fallback: string) => string;
  setTitle: (id: string, title: string) => void;
}>({ getTitle: (_, fb) => fb, setTitle: () => { } });

export function DashboardTitlesProvider({ children }: { children: React.ReactNode }) {
  const [titles, setTitles] = useState<Map<string, string>>(new Map());

  const getTitle = (id: string, fallback: string) => titles.get(id) ?? fallback;
  const setTitle = (id: string, title: string) =>
    setTitles(prev => new Map(prev).set(id, title));

  return (
    <DashboardTitlesContext.Provider value={{ getTitle, setTitle }}>
      {children}
    </DashboardTitlesContext.Provider>
  );
}
