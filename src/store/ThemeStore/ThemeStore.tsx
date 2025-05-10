import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { themes } from '../../styles/theming';

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: (typeof themes)[ThemeName];
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const initialTheme = colorScheme === 'dark' ? 'darkTheme' : 'lightTheme';

  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeName(colorScheme === 'dark' ? 'darkTheme' : 'lightTheme');
    });
    return () => subscription.remove();
  }, []);

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
