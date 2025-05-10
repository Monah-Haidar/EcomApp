import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useAuth } from '../../store/AuthStore/AuthStore';
import { useTheme } from '../../store/ThemeStore/ThemeStore';
import { AuthStack } from '../stacks/AuthStack';
import { GuestStack } from '../stacks/GuestStack';


const AppNavigator = () => {
  const {themeName} = useTheme();
  const auth = useAuth();
  return (
    <NavigationContainer
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      {auth?.isSignedIn ? <AuthStack auth={auth} /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
