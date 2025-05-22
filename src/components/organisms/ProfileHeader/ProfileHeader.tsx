import {Text, View} from 'react-native';
import {ProfileImagePicker} from '../../molecules/ProfileImagePicker';
import {Badge} from '../../atoms/Badge';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {profileHeaderStyles} from './profileHeaderStyles';
import useAuthStore, {User} from '../../../store/AuthStore/AuthStore';



const ProfileHeader = () => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();
  const styles = profileHeaderStyles(theme);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <ProfileImagePicker />

        {/* <TouchableOpacity
            style={[styles.cameraButton, {backgroundColor: theme.primary}]}
            onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="camera" size={20} color={theme.buttonText} />
          </TouchableOpacity> */}
      </View>

      <Text style={[styles.userName, {color: theme.text}]}>
        {user?.firstName} {user?.lastName}
      </Text>

      <Badge
        isVerified={user?.isEmailVerified}
        text={user?.isEmailVerified ? 'Verified Account' : 'Unverified Account'}
        icon="verified"
      />
    </View>
  );
};

export default ProfileHeader;
