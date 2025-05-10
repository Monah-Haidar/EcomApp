import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
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
import {formStyles} from '../../../styles/formStyles';

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

const SignUpScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  const styles = formStyles(theme);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: 'john doe',
      email: 'john@doe.com',
      password: '12345678',
      phoneNb: '0071143125',
    },
    mode: 'onBlur',
  });

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
        keyboardShouldPersistTaps="handled"
        >
        <View style={styles.container}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-with-circle-left" size={30} color="#4F8EF7" />
          </Pressable>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter your name"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="phoneNb"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phoneNb && (
              <Text style={styles.errorText}>{errors.phoneNb.message}</Text>
            )}
          </View>

          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </Pressable>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
