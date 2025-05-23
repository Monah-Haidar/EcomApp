// import {Text, View} from 'react-native';

// const EditProfileScreen = () => {
//   return (
//     <View>
//       <Text>EditProfileScreen</Text>
//     </View>
//   );
// };

// export default EditProfileScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import useAuthStore from '../../../store/AuthStore/AuthStore';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FormInputContainer} from '../../../components/molecules/FormInputContainer';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
// import { useUpdateProfileMutation } from '../../../hooks/useUpdateProfileMutation/useUpdateProfileMutation';
import {BackButton} from '../../../components/atoms/BackButton';
import {global} from '../../../styles/global';
import {FormErrorDisplay} from '../../../components/atoms/FormErrorDisplay';
import {CustomHeader} from '../../../components/molecules/CustomHeader';
import {ProfileHeader} from '../../../components/organisms/ProfileHeader';
import {ProfileImagePicker} from '../../../components/molecules/ProfileImagePicker';
import {useUpdateProfileMutation} from '../../../hooks/useUpdateProfileMutation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import {editProfileScreenStyles} from './editProfileScreenStyles';

// Define validation schema for profile updates
const ProfileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(3, {message: 'First name must be at least 3 characters long'})
    .max(20, {message: 'First name must be at most 20 characters long'}),
  lastName: z
    .string()
    .min(3, {message: 'Last name must be at least 3 characters long'})
    .max(20, {message: 'Last name must be at most 20 characters long'}),
  email: z.string().email({message: 'Invalid email address'}),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

const EditProfileScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const insets = useSafeAreaInsets();
  const [profileImage, setProfileImage] = useState<any>(null);

  const {mutate, isPending, error} = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, reset]);

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

  const onSubmit = (data: FormData) => {
    
    mutate({
      ...data,
      profileImage: profileImage,
    });
  };

  const globalStyles = global(theme);
  

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={{backgroundColor: theme.background}}
        contentContainerStyle={[globalStyles.contentContainer, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]}>
        <CustomHeader text="Edit Profile" />

        <View style={globalStyles.container}>
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
              Tap to change profile photo
            </Text>
          </View>

          <View>
            {error && <FormErrorDisplay error={error?.message} />}

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
              editable={false}
            />

            <SubmitButton
              text="Save Changes"
              isLoading={isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
