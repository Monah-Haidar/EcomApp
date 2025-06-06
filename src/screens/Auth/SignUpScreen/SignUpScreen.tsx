import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {z} from 'zod';
import {BackButton} from '../../../components/atoms/BackButton';
import FormFooterText from '../../../components/atoms/FormFooterText/FormFooterText';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {FormInputContainer} from '../../../components/molecules/FormInputContainer';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {useSignUpMutation} from '../../../hooks/useSignUpMutation';
import {useCallback, useMemo, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {ProfileImagePicker} from '../../../components/molecules/ProfileImagePicker';
import {FormErrorDisplay} from '../../../components/atoms/FormErrorDisplay';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

const SignUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is Required',
      invalid_type_error: 'First name must be a string',
    })
    .min(3, {message: 'First name must be at least 3 characters long'})
    .max(20, {message: 'First name must be at most 20 characters long'}),

  lastName: z
    .string({
      required_error: 'Last name is Required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(3, {message: 'Last name must be at least 3 characters long'})
    .max(20, {message: 'Last name must be at most 20 characters long'}),

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

type FormData = z.infer<typeof SignUpSchema>;

type RootStackParamList = {
  Login: undefined;
  Verification: undefined;
};

const SignUpScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {mutate, isPending, error} = useSignUpMutation();
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  const [profileImage, setProfileImage] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: 'john',
      lastName: 'doe',
      email: 'monahhaidar1123@gmail.com',
      password: '12345678',
    },
    mode: 'onBlur',
  });
  // console.log('Screen Error: ', errors);

  const globalStyles = global(theme);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];

      setProfileImage({
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName || 'profile.jpg',
      });
    }
  };

  const onSubmit = useCallback(
    (data: FormData) => {
      const signUpData = {
        ...data,
        profileImage: profileImage,
      };
      mutate(signUpData);
    },
    [mutate, profileImage]
  );

  const handleNavigate = useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );

  const scrollViewStyle = useMemo(
    () => ({
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [insets.top, insets.bottom, insets.left, insets.right]
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <View style={globalStyles.container}>
          <BackButton />

          <Text style={[globalStyles.heading, globalStyles.headingContainer]}>
            Sign Up
          </Text>

          {error && <FormErrorDisplay error={error?.message} />}

          <View>
            <View style={globalStyles.imageSection}>
              <View>
                <ProfileImagePicker localImage={profileImage} />
                <Pressable
                  style={globalStyles.cameraButton}
                  onPress={handleImagePick}>
                  <Feather name="camera" size={20} color={theme.buttonText} />
                </Pressable>
              </View>
              <Text style={globalStyles.changePhotoText}>
                Tap to add profile photo
              </Text>
            </View>

            <FormInputContainer<FormData>
              label="First Name"
              control={control}
              name="firstName"
              placeholder="Enter your first name"
              errors={errors}
            />
            <FormInputContainer<FormData>
              label="Last Name"
              control={control}
              name="lastName"
              placeholder="Enter your last name"
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
          </View>

          <SubmitButton
            text="Sign Up"
            isLoading={isPending}
            onPress={handleSubmit(onSubmit)}
          />

          <FormFooterText
            text="Already have an account?"
            linkText="Login"
            onPress={handleNavigate}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;


