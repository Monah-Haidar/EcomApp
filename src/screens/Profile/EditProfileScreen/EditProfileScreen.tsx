import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { z } from 'zod';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { CameraView } from '../../../components/molecules/CameraView';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { FormInputContainer } from '../../../components/molecules/FormInputContainer';
import { ProfileImagePicker } from '../../../components/molecules/ProfileImagePicker';
import { useUpdateProfileMutation } from '../../../hooks/useUpdateProfileMutation';
import useAuthStore from '../../../store/AuthStore/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { global } from '../../../styles/global';
import { editProfileScreenStyles } from './editProfileScreenStyles';



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
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

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
  const handleImagePick = () => {
    setShowImageModal(true);
  };

  const handleGalleryPress = async () => {
    setShowImageModal(false);
    try {
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
    } catch (error) {
      console.error('Error picking image from gallery:', error);
    }
  };

  const handleCameraPress = () => {
    setShowImageModal(false);
    setShowCamera(true);
  };

  const handlePhotoTaken = (photo: {uri: string}) => {
    const newPhoto = {
      ...photo,
      type: 'image/jpeg',
      name: `profile_${Date.now()}.jpg`,
    };
    setProfileImage(newPhoto);
    setShowCamera(false);
  };

  const onSubmit = (data: FormData) => {
    mutate({
      ...data,
      profileImage: profileImage,
    });
  };

  const globalStyles = global(theme);
  const localStyles = editProfileScreenStyles(theme);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={{backgroundColor: theme.background}}
        contentContainerStyle={[
          globalStyles.contentContainer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}>
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

        
        <Modal
          visible={showImageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowImageModal(false)}>
          <View style={localStyles.modalOverlay}>
            <View
              style={[
                localStyles.modalContent,
                {backgroundColor: theme.background},
              ]}>
              <Text style={[localStyles.modalTitle, {color: theme.text}]}>
                Update Profile Photo
              </Text>
              <Text
                style={[
                  localStyles.modalSubtitle,
                  {color: theme.subheadingText},
                ]}>
                Choose how you'd like to update your profile photo
              </Text>

              <Pressable
                style={[
                  localStyles.modalOption,
                  {backgroundColor: theme.cardBackground},
                ]}
                onPress={handleCameraPress}>
                <Ionicons name="camera" size={24} color={theme.primary} />
                <Text
                  style={[localStyles.modalOptionText, {color: theme.text}]}>
                  Take Photo
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.text} />
              </Pressable>

              <Pressable
                style={[
                  localStyles.modalOption,
                  {backgroundColor: theme.cardBackground},
                ]}
                onPress={handleGalleryPress}>
                <Ionicons name="images" size={24} color={theme.primary} />
                <Text
                  style={[localStyles.modalOptionText, {color: theme.text}]}>
                  Choose from Gallery
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.text} />
              </Pressable>

              <Pressable
                style={[
                  localStyles.modalCancelButton,
                  {backgroundColor: theme.border},
                ]}
                onPress={() => setShowImageModal(false)}>
                <Text
                  style={[localStyles.modalCancelText, {color: theme.text}]}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        
        <Modal
          visible={showCamera}
          animationType="slide"
          onRequestClose={() => setShowCamera(false)}>
          <CameraView
            onPhotoTaken={handlePhotoTaken}
            onClose={() => setShowCamera(false)}
          />
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default EditProfileScreen;
