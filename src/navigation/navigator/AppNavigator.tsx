import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useAuth } from '../../store/AuthStore/AuthStore';
import { useTheme } from '../../store/ThemeStore/ThemeStore';
import { ProductStack } from '../stacks/ProductStack';
import { AuthStack } from '../stacks/AuthStack';


const AppNavigator = () => {
  const {themeName} = useTheme();
  const auth = useAuth();
  return (
    <NavigationContainer
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      {auth?.isSignedIn ? <ProductStack auth={auth} /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
