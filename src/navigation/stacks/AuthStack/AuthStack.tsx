import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../../screens/Auth/LoginScreen';
import {SignUpScreen} from '../../../screens/Auth/SignUpScreen';
import {VerificationScreen} from '../../../screens/Auth/VerificationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
