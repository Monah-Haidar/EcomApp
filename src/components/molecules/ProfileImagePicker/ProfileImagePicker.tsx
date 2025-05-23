import { Image, Text, View } from 'react-native';
import useAuthStore from '../../../store/AuthStore/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { profileImagePickerStyles } from './profileImagePickerStyles';

interface ProfileImagePickerProps {
  localImage?: {uri: string} | null;
}

const ProfileImagePicker = ({localImage}: ProfileImagePickerProps) => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();
  const styles = profileImagePickerStyles(theme);

  return (
    <View style={styles.imagePickerContainer}>
      <View style={styles.profileImageWrapper}>
        {localImage ? (
          
          <Image
            source={{uri: localImage.uri}}
            style={styles.profileImage}
          />
        ) : user?.profileImage ? (
          
          <Image
            source={{
              uri: 'https://backend-practice.eurisko.me' + user.profileImage.url,
            }}
            style={styles.profileImage}
          />
        ) : (
          
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};



export default ProfileImagePicker;
