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
import {useAuthStore} from '../../../store/AuthStore';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {FormInputContainer} from '../../../components/molecules/FormInputContainer';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import FormFooterText from '../../../components/atoms/FormFooterText/FormFooterText';
import {FormErrorDisplay} from '../../../components/atoms/FormErrorDisplay';
import axiosInstance from '../../../api/config';

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Invalid email address',
    }),

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
  // const auth = useAuth();
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
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const styles = global(theme);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);


    // if (!(data.email === 'eurisko' && data.password === 'academy2025')) {
    //   console.log('invalid credentials');
    //   return setError('Invalid credentials');
    // }

    // setError(null);
    // auth?.login();
    // console.log('Login successful!');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Log in</Text>
            <Text style={styles.subHeading}>
              Enter you credentials to access your account
            </Text>
          </View>

          {error && <FormErrorDisplay error={error} />}

          <View>
            <FormInputContainer<FormData>
              label="Email"
              control={control}
              name="email"
              placeholder="Enter your email"
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
          </View>

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
