import React from 'react';
import { AppNavigator } from './src/navigation/navigator';
import { AuthProvider } from './src/store/AuthStore/AuthStore';
import { ThemeProvider } from './src/store/ThemeStore/ThemeStore';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
