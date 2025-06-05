import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './src/navigation/navigator';
// import {AuthStore} from './src/store/AuthStore';
import {ThemeProvider} from './src/store/ThemeStore/ThemeStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';
import {OneSignal, LogLevel} from 'react-native-onesignal';
import Config from 'react-native-config';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  // Enable verbose logging for debugging (remove in production)
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // Initialize with your OneSignal App ID
  OneSignal.initialize(Config.ONESIGNAL_APP_ID || '');
  // Use this method to prompt for push notifications.
  // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
  OneSignal.Notifications.requestPermission(false);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

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
