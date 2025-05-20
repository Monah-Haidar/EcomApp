import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { useAuthStore } from '../../store/AuthStore';
import { useTheme } from '../../store/ThemeStore/ThemeStore';
import { AuthStack } from '../stacks/AuthStack';
import { MainTabNavigator } from '../tabs/MainTabNavigator';



const AppNavigator = () => {
  const {themeName} = useTheme();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
 
  return (
    <NavigationContainer
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
