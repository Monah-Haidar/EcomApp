import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ProfileStack } from '../../stacks/ProfileStack';
import { ProductStack } from '../../stacks/ProductStack';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return <Tab.Navigator screenOptions={({route}) => ({
    headerShown: false,
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />
    }
  })}>
    <Tab.Screen name='Home' component={ProductStack} />
    <Tab.Screen name='Profile' component={ProfileStack} />
  </Tab.Navigator>;
};

export default MainTabNavigator;
