import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {z} from 'zod';
import {useAuth} from '../../../store/AuthStore/AuthStore';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {FormInputContainer} from '../../../components/molecules/FormInputContainer';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import FormFooterText from '../../../components/atoms/FormFooterText/FormFooterText';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';

const LoginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(3, {message: 'Username must be at least 3 characters long'})
    .max(50, {message: 'Username must be at most 50 characters long'}),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, {message: 'Password must be at least 8 characters long'})
    .max(50, {message: 'Password must be at most 50 characters long'}),
});

type FormData = z.infer<typeof LoginSchema>;
type RootStackParamList = {
  SignUp: undefined;
};

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const auth = useAuth();
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const styles = global(theme);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);

    if (!(data.username === 'eurisko' && data.password === 'academy2025')) {
      console.log('invalid credentials');
      return setError('Invalid credentials');
    }

    setError(null);
    auth?.login();
    console.log('Login successful!');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        keyboardShouldPersistTaps="handled">
        
        
        <View style={styles.container}>
          <Text style={[styles.heading, {marginVertical: 64}]}>Login</Text>

          {error && <FormErrorDisplay error={error} />}

          <FormInputContainer<FormData>
            label="Username"
            control={control}
            name="username"
            placeholder="Enter your username"
            keyboardType="email-address"
            errors={errors}
          />

          <FormInputContainer<FormData>
            label="Password"
            control={control}
            name="password"
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry={true}
            errors={errors}
          />

          <SubmitButton text="Login" onPress={handleSubmit(onSubmit)} />

          <FormFooterText
            text="Don't have an account?"
            linkText="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
