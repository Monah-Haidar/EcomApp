import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/navigation/navigator';
import {AuthProvider} from './src/store/AuthStore/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
