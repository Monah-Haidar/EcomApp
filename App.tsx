import React from 'react';
import {AppNavigator} from './src/navigation/navigator';
// import {AuthStore} from './src/store/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* <AuthProvider> */}
          <AppNavigator />
        {/* </AuthProvider> */}
      </ThemeProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
