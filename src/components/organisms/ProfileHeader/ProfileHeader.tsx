import { Text, View } from 'react-native';
import useAuthStore from '../../../store/AuthStore/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { Badge } from '../../atoms/Badge';
import { ProfileImagePicker } from '../../molecules/ProfileImagePicker';
import { profileHeaderStyles } from './profileHeaderStyles';
import React, { useMemo } from 'react';



const ProfileHeader = () => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();
  const styles =  useMemo(() => profileHeaderStyles(theme), [theme]);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <ProfileImagePicker />
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

export default React.memo(ProfileHeader);
