import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileStack} from '../../stacks/ProfileStack';
import {ProductStack} from '../../stacks/ProductStack';
import {MainTabParamList} from '../../types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCallback} from 'react';
import { CartScreen } from '../../../screens/Product/CartScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const renderTabIcon = useCallback(
    ({
      route,
      focused,
      color,
      size,
    }: {
      route: {name: string};
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName = '';

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          renderTabIcon({route, focused, color, size}),
      })}>
      <Tab.Screen name="Home" component={ProductStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
