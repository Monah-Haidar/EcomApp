import {Image, Pressable, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {profileImagePickerStyles} from './profileImagePickerStyles';

interface ProfileImagePickerProps {
  onPress: () => void;
  profileImage: {uri: string} | null;
}

const ProfileImagePicker = ({
  onPress,
  profileImage,
}: ProfileImagePickerProps) => {
  const {theme} = useTheme();
  const styles = profileImagePickerStyles(theme);

  return (
    <View style={styles.imagePickerContainer}>
      <Pressable onPress={onPress} style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{uri: profileImage.uri}} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text
              style={[
                styles.placeholderText,
                // {color: theme.colors.text},
              ]}>
              Add Profile Photo
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ProfileImagePicker;
