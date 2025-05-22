import {Image, Pressable, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {profileImagePickerStyles} from './profileImagePickerStyles';
import useAuthStore, { User } from '../../../store/AuthStore/AuthStore';

interface ProfileImagePickerProps {
  // onPress: () => void;
  // profileImage: {uri: string} | null;
  // user: User
}

const ProfileImagePicker = ({
  // onPress,
  // profileImage,
  // user
}: ProfileImagePickerProps) => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();
  const styles = profileImagePickerStyles(theme);

  return (
    <View
      style={[
        styles.profileImageWrapper,
        {backgroundColor: theme.cardBackground},
      ]}>
      {user?.profileImage ? (
        <Image
          source={{
            uri: 'https://backend-practice.eurisko.me' + user.profileImage.url,
          }}
          style={styles.profileImage}
        />
      ) : (
        
        <View
          style={[styles.placeholderImage, {backgroundColor: theme.secondary}]}>
          <Text style={[styles.placeholderText, {color: theme.buttonText}]}>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Text>
        </View>
      )}
    </View>
  );
};

// const ProfileImagePicker = ({
//   onPress,
//   profileImage,
// }: ProfileImagePickerProps) => {
//   const {theme} = useTheme();
//   const styles = profileImagePickerStyles(theme);

//   return (
//     <View style={styles.imagePickerContainer}>
//       <Pressable onPress={onPress} style={styles.imagePicker}>
//         {profileImage ? (
//           <Image source={{uri: profileImage.uri}} style={styles.profileImage} />
//         ) : (
//           <View style={styles.placeholderContainer}>
//             <Text
//               style={[
//                 styles.placeholderText,
//                 // {color: theme.colors.text},
//               ]}>
//               Add Profile Photo
//             </Text>
//           </View>
//         )}
//       </Pressable>
//     </View>
//   );
// };

export default ProfileImagePicker;
