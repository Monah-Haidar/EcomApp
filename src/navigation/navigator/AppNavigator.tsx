import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ActivityIndicator, Linking, View} from 'react-native';
import {useAuthStore} from '../../store/AuthStore';
import {useTheme} from '../../store/ThemeStore/ThemeStore';
import {AuthStack} from '../stacks/AuthStack';
import {MainTabNavigator} from '../tabs/MainTabNavigator';
import {RootStackParamList} from '../types';
import {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PENDING_DEEP_LINK_KEY = 'pendingDeepLink';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['ecomapp://', 'https://ecomapp.com'],
  config: {
    screens: {
      Main: {
        path: '',
        screens: {
          Home: {
            path: 'products',
            screens: {
              ProductList: '',
              ProductDetails: ':productId',
            },
          },
        },
      },
    },
  },
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {themeName} = useTheme();
  const isHydrated = useAuthStore(state => state.hydrated);
  const accessToken = useAuthStore(state => state.accessToken);
  const isAuthenticated = !!accessToken;
  const navigationRef = useRef<any>(null);

  // Store deep link in AsyncStorage
  const storePendingLink = async (url: string) => {
    try {
      await AsyncStorage.setItem(PENDING_DEEP_LINK_KEY, url);
      console.log('📱 Stored pending deep link:', url);
    } catch (error) {
      console.error('❌ Failed to store pending deep link:', error);
    }
  };

  // Retrieve deep link from AsyncStorage
  const getPendingLink = async (): Promise<string | null> => {
    try {
      const link = await AsyncStorage.getItem(PENDING_DEEP_LINK_KEY);
      return link;
    } catch (error) {
      console.error('❌ Failed to retrieve pending deep link:', error);
      return null;
    }
  };

  // Clear stored deep link
  const clearPendingLink = async () => {
    try {
      await AsyncStorage.removeItem(PENDING_DEEP_LINK_KEY);
      console.log('🗑️ Cleared pending deep link');
    } catch (error) {
      console.error('❌ Failed to clear pending deep link:', error);
    }
  };

  // Handle initial deep link when app is opened
  useEffect(() => {
    const getInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url && !isAuthenticated) {
          console.log('📩 Storing initial deep link for after login:', url);
          await storePendingLink(url);
        }
      } catch (error) {
        console.error('❌ Error getting initial URL:', error);
      }
    };

    if (isHydrated) {
      getInitialURL();
    }
  }, [isAuthenticated, isHydrated]);

  // Listen for deep links while app is running
  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      console.log('📩 Received deep link:', event.url);

      if (!isAuthenticated) {
        console.log('🔒 User not authenticated, storing link for later:', event.url);
        storePendingLink(event.url);
      }
      // If authenticated, let the normal linking handle it
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, [isAuthenticated]);
  // Navigate to pending link after authentication
  useEffect(() => {
    const handlePendingLink = async () => {
      if (isAuthenticated && navigationRef.current) {
        const pendingLink = await getPendingLink();
        
        if (pendingLink) {
          console.log('✅ User authenticated, navigating to pending link:', pendingLink);
          
          // Add a small delay to ensure navigation is ready
          setTimeout(async () => {
            // Extract the path from the deep link
            const path = pendingLink.replace(/^(ecomapp:\/\/|https:\/\/ecomapp\.com\/)/, '');
            
            // Navigate to the deep link destination
            if (path.startsWith('products/')) {
              const productId = path.replace('products/', '');
              if (productId && productId !== 'products') {
                // Navigate to specific product
                navigationRef.current?.navigate('Main', {
                  screen: 'Home',
                  params: {
                    screen: 'ProductDetails',
                    params: {productId},
                  },
                });
              } else {
                // Navigate to product list
                navigationRef.current?.navigate('Main', {
                  screen: 'Home',
                  params: {
                    screen: 'ProductList',
                  },
                });
              }
            }
            
            // Clear the pending link after successful navigation
            await clearPendingLink();
          }, 100);
        }
      }
    };

    if (isHydrated && isAuthenticated) {
      handlePendingLink();
    }  }, [isAuthenticated, isHydrated]);

  if (!isHydrated) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
