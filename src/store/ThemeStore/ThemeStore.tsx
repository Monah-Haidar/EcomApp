import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { themes } from '../../styles/theming';

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: (typeof themes)[ThemeName];
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children, systemTheme}: {children: ReactNode; systemTheme?: 'light' | 'dark';}) => {

  const [themeName, setThemeName] = useState<ThemeName>(systemTheme === 'dark' ? 'darkTheme' : 'lightTheme');

  useEffect(() => {
    if (systemTheme) {
      setThemeName(systemTheme === 'dark' ? 'darkTheme' : 'lightTheme');
    }
  }, [systemTheme]);

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{theme, themeName, setThemeName}}>
        {children}
    </ThemeContext.Provider>
  )
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

