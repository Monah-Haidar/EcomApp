import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, Text, View} from 'react-native';
import {ProductListScreen} from '../../../screens/Product/ProductListScreen';
import {ProductDetailsScreen} from '../../../screens/Product/ProductDetailsScreen';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useAuthStore } from '../../../store/AuthStore';


const Stack = createNativeStackNavigator();

const ProductStack = () => {

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const clearTokens = useAuthStore(state => state.clearTokens);

  const {themeName, setThemeName} = useTheme();

  const toggleTheme = () => {
    setThemeName(themeName === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
            fontSize: FONT_SIZE.XL,
          },
          headerRight: () => (
            <View style={{flexDirection: 'row', gap: 24, alignItems: 'center'}}>
              <Pressable onPress={() => toggleTheme()}>
                {themeName === 'lightTheme' ? (
                  <Entypo name="moon" size={30} color="#4F8EF7" />
                ) : (
                  <Feather name="sun" size={30} color="#4F8EF7" />
                )}
              </Pressable>
              <Pressable onPress={clearTokens}>
                <MaterialCommunityIcons
                  name="logout"
                  size={30}
                  color="#4F8EF7"
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
            fontSize: FONT_SIZE.XL,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductStack;
