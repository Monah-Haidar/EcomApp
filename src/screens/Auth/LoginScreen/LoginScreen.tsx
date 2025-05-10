import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useAuth } from '../../../store/AuthStore/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { formStyles } from '../../../styles/formStyles';

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

const LoginScreen = () => {
  const navigation = useNavigation();
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
      email: 'eurisko@gmail.com',
      password: 'academy2025',
    },
    mode: 'onBlur',
  });

  const styles = formStyles(theme);



  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);

    if (
      !(data.email === 'eurisko@gmail.com' && data.password === 'academy2025')
    ) {
      console.log('invalid credentials');
      return setError('Invalid credentials');
    }

    setError(null);
    auth?.login();
    console.log('Login successful!');
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
        },
      ]}>
      <Text style={[styles.title, {marginTop: 64}]}>Login</Text>

      {/* <View style={styles.body}> */}
      {error && <Text style={styles.generalError}>{error}</Text>}

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

      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Login</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
    // </View>
  );
};

export default LoginScreen;
