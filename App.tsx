import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './src/navigation/navigator';
// import {AuthStore} from './src/store/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
