import React from 'react';
import AppContent from './src/AppContent';
import {AuthProvider} from './src/store/AuthStore/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
