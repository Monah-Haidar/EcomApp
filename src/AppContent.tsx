import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import { AppNavigator } from './navigation/navigator';
import { useTheme } from './store/ThemeStore/ThemeStore';

const AppContent = () => {
  const {themeName} = useTheme();
  return (
    <NavigationContainer
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContent;
