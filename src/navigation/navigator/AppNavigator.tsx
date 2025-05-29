import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuthStore} from '../../store/AuthStore';
import {useTheme} from '../../store/ThemeStore/ThemeStore';
import {AuthStack} from '../stacks/AuthStack';
import {MainTabNavigator} from '../tabs/MainTabNavigator';
import {ActivityIndicator, Linking, View} from 'react-native';
import {useEffect} from 'react';
import {RootStackParamList} from '../types';

// const linking: LinkingOptions<RootStackParamList> = {
//   prefixes: ['ecomapp://', 'https://ecomapp.com'],
//   config: {
//     screens: {
//       // Main Tab Navigator
//       MainTab: {
//         path: '',
//         screens: {
//           Home: 'home',
//           Products: 'products',
//           Profile: 'profile',
//         },
//       },
//       // Auth Stack
//       Auth: {
//         path: 'auth',
//         screens: {
//           Login: 'login',
//           SignUp: 'signup',
//           Verification: 'verification',
//         },
//       },
//       // Product Screens
//       ProductDetails: 'product/:productId',
//       AddProduct: 'add-product',
//       EditProduct: 'edit-product/:productId',
//       // Profile Screens
//       EditProfile: 'edit-profile',
//     },
//   },
// };

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['ecomapp://', 'https://ecomapp.com'],
  config: {
    screens: {
      Main: {
        path: '',
        screens: {
          Home: {
            path: 'home',
            screens: {
              ProductList: '',
              ProductDetails: 'home/:productId',
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
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      console.log('📩 Received deep link:', event.url);
      // Add more debugging
      console.log('Deep link event:', JSON.stringify(event, null, 2));
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL()
      .then(url => {
        console.log('🔗 Initial URL:', url);
        if (url) {
          console.log('✅ Found initial URL, processing:', url);
        } else {
          console.log('ℹ️ No initial URL found (app opened normally)');
        }
      })
      .catch(error => {
        console.error('❌ Error getting initial URL:', error);
      });

    return () => {
      subscription?.remove();
    };
  }, []);

  if (!isHydrated) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer
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
