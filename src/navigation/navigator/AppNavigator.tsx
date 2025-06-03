import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../../store/AuthStore';
import { useTheme } from '../../store/ThemeStore/ThemeStore';
import { AuthStack } from '../stacks/AuthStack';
import { MainTabNavigator } from '../tabs/MainTabNavigator';
import { RootStackParamList } from '../types';



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

// const [pendingLink, setPendingLink] = useState<string | null>(null);
//   const navigationRef = useRef<any>(null);

//   // Store initial deep link if unauthenticated
//   useEffect(() => {
//     const getInitialURL = async () => {
//       const url = await Linking.getInitialURL();
//       if (url && !isAuthenticated) {
//         setPendingLink(url);
//       }
//     };
//     getInitialURL();
//   }, [isAuthenticated]);

//   // Listen for deep links while app is running
//   useEffect(() => {
//     const handleDeepLink = (event: { url: string }) => {
//       if (isAuthenticated && navigationRef.current) {
//         // If authenticated, navigate and allow back navigation
//         const path = event.url.replace(/.*?:\/\//g, '');
//         navigationRef.current.navigate(path);
//       } else {
//         // If not authenticated, store for after login
//         setPendingLink(event.url);
//       }
//     };
//     const subscription = Linking.addEventListener('url', handleDeepLink);
//     return () => subscription.remove();
//   }, [isAuthenticated]);

//   // After login, navigate to pending link
//   useEffect(() => {
//     if (isAuthenticated && pendingLink && navigationRef.current) {
//       const path = pendingLink.replace(/.*?:\/\//g, '');
//       navigationRef.current.navigate(path);
//       setPendingLink(null);
//     }
//   }, [isAuthenticated, pendingLink]);

// useEffect(() => {
//   const handleDeepLink = (event: {url: string}) => {
//     console.log('📩 Received deep link:', event.url);
//     // Add more debugging
//     console.log('Deep link event:', JSON.stringify(event, null, 2));
//   };

//   const subscription = Linking.addEventListener('url', handleDeepLink);

//   Linking.getInitialURL()
//     .then(url => {
//       console.log('🔗 Initial URL:', url);
//       if (url) {
//         console.log('✅ Found initial URL, processing:', url);
//         setInitialLink(url);
//       } else {
//         console.log('ℹ️ No initial URL found (app opened normally)');
//       }
//     })
//     .catch(error => {
//       console.error('❌ Error getting initial URL:', error);
//     });

//   return () => {
//     subscription?.remove();
//   };
// }, []);

// useEffect(() => {
//   if (isAuthenticated && initialLink) {
//     // manually navigate after login
//     const path = initialLink.replace('myapp://', '');
//     navigation.navigate(path); // or use deep linking parser
//   }
// }, [isAuthenticated, initialLink]);







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