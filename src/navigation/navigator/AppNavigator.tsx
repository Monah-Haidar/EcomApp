import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {useAuthStore} from '../../store/AuthStore';
import {useTheme} from '../../store/ThemeStore/ThemeStore';
import {AuthStack} from '../stacks/AuthStack';
import {MainTabNavigator} from '../tabs/MainTabNavigator';
import {ActivityIndicator, View} from 'react-native';

const AppNavigator = () => {
  const {themeName} = useTheme();
  const isHydrated = useAuthStore(state => state.hydrated);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isHydrated) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={themeName === 'darkTheme' ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
