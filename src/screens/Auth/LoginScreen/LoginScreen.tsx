import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';
import FormFooterText from '../../../components/atoms/FormFooterText/FormFooterText';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { FormInputContainer } from '../../../components/molecules/FormInputContainer';
import { useLoginMutation } from '../../../hooks/useLoginMutation';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { global } from '../../../styles/global';
import React from 'react';

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

  token_expires_in: z.string(),
});

type FormData = z.infer<typeof LoginSchema>;
type RootStackParamList = {
  SignUp: undefined;
};

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {mutate, isPending, error} = useLoginMutation();
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'monahhaidar1123+7@gmail.com',
      password: '12345678',
      token_expires_in: '1h',
    },
    mode: 'onBlur',
  });

  const styles = useMemo(() => global(theme), [theme]);

  const handleNavigate = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      const {email, password, token_expires_in} = data;

      mutate({email, password, token_expires_in});
    },
    [mutate]
  );

  const scrollViewStyle = useMemo(
    () => ({
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [insets.top, insets.bottom, insets.left, insets.right],
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Log in</Text>
            <Text style={styles.subHeading}>
              Enter you credentials to access your account
            </Text>
          </View>

          {error && <FormErrorDisplay error={error?.message} />}

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

          <SubmitButton
            text="Login"
            isLoading={isPending}
            onPress={handleSubmit(onSubmit)}
          />

          <FormFooterText
            text="Don't have an account?"
            linkText="Sign Up"
            onPress={handleNavigate}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
