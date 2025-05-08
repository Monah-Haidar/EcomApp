import React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/navigation/navigator';
import {AuthProvider} from './src/store/AuthStore/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';
import { useColorScheme } from 'react-native';

function App(): React.JSX.Element {
  const theme = useColorScheme();
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
