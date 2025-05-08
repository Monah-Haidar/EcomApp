import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/Auth/LoginScreen';
import { SignUpScreen } from '../../screens/Auth/SignUpScreen';
import { VerificationScreen } from '../../screens/Auth/VerificationScreen';
import { ProductListScreen } from '../../screens/Product/ProductListScreen';
import { ProductDetailsScreen } from '../../screens/Product/ProductDetailsScreen';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductDetails">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />


        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />

    </Stack.Navigator>
  )
}

export default AppNavigator