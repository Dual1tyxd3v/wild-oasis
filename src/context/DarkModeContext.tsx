import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

type DarkModeContextInintState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeContext = createContext<null | DarkModeContextInintState>(null);

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-schema: dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((i: boolean) => !i);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error('Context must be consumed in a provider');

  return context;
}

export default DarkModeProvider;
