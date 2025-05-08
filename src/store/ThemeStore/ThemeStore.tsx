import { createContext, ReactNode, useContext, useState } from 'react';
import { themes } from '../../styles/theming';

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: (typeof themes)[ThemeName];
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {

  const [themeName, setThemeName] = useState<ThemeName>('lightTheme');
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

