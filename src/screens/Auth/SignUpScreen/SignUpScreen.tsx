import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {z} from 'zod';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import FormFooterText from '../../../components/atoms/FormFooterText/FormFooterText';
import {FormInputContainer} from '../../../components/molecules/FormInputContainer';
import { BackButton } from '../../../components/atoms/BackButton';


const SignUpSchema = z.object({
  name: z
    .string({
      required_error: 'Name is Required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, {message: 'Name must be at least 3 characters long'})
    .max(20, {message: 'Name must be at most 20 characters long'}),

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

  phoneNb: z
    .string()
    .regex(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits long'),
});

type FormData = z.infer<typeof SignUpSchema>;

type RootStackParamList = {
  Login: undefined;
  Verification: undefined;
};

const SignUpScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: 'dgagadg',
      email: 'gdas@dgasg.com',
      password: 'fdagf4aregadg',
      phoneNb: '4234243242',
    },
    mode: 'onBlur',
  });

  const styles = global(theme);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    navigation.navigate('Verification');
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

          <BackButton />

          <Text style={[styles.heading, styles.headingContainer]}>Sign Up</Text>

          <View>
            <FormInputContainer<FormData>
              label="Name"
              control={control}
              name="name"
              placeholder="Enter your name"
              errors={errors}
            />
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
              secureTextEntry
              errors={errors}
            />
            <FormInputContainer<FormData>
              label="Phone Number"
              control={control}
              name="phoneNb"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              errors={errors}
            />
          </View>

          <SubmitButton text="Sign Up" onPress={handleSubmit(onSubmit)} />

          <FormFooterText
            text="Already have an account?"
            linkText="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
