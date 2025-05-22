import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { InfoRow } from '../../../components/molecules/InfoRow';
import { ProfileHeader } from '../../../components/organisms/ProfileHeader';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useAuthStore } from '../../../store/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { global } from '../../../styles/global';
import { profileScreenStyles } from './profileScreenStyles';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {isPending} = useUserProfile();
  // const user = useAuthStore(state => state.user);
  const clearTokens = useAuthStore(state => state.clearTokens);
  

 
  const globalStyles = global(theme);

  if (isPending) {
    return (
      <View
        style={[globalStyles.container, {backgroundColor: theme.background}]}>
        <Text style={{color: theme.text}}>Loading...</Text>
      </View>
    );
  }

  // console.log('User Profile: ', userProfile?.data.user);

  // const user = userProfile?.data.user;

  // console.log(
  //   'URL: ',
  //   `https://backend-practice.eurisko.me${user?.profileImage.url}`,
  // );

  return (
    <ScrollView
      style={[globalStyles.container, {backgroundColor: theme.background}]}
      contentContainerStyle={globalStyles.contentContainer}>

      <ProfileHeader />

      <View>
        <View style={globalStyles.infoCard}>
          <InfoRow
            label="Email"
            icon={<Feather name="mail" size={20} color={theme.primary} />}
          />
          <View
            style={{borderBottomColor: theme.border, borderBottomWidth: 1}}
          />
          <InfoRow
            label="Password"
            icon={<Feather name="lock" size={20} color={theme.primary} />}
          />
        </View>

        <SubmitButton
          text="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          variant="primary"
          icon={<Feather name="edit-2" size={16} color={theme.buttonText} />}
        />

        <SubmitButton
          text="Logout"
          onPress={clearTokens}
          variant="danger"
          icon={<Feather name="log-out" size={16} color="#d32f2f" />}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

{
  /* <View
            style={[
              styles.profileImageWrapper,
              {backgroundColor: theme.cardBackground},
            ]}>
            {user?.profileImage ? (
              <Image
                source={{uri: 'https://backend-practice.eurisko.me' + user.profileImage.url}}
                style={styles.profileImage}
              />
              // <Text>{'https://backend-practice.eurisko.me/api' + user.profileImage.url}</Text>
            ) : (
              <View
                style={[
                  styles.placeholderImage,
                  {backgroundColor: theme.secondary},
                ]}>
                <Text
                  style={[styles.placeholderText, {color: theme.buttonText}]}>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </Text>
              </View>
            )}
          </View> */
}

{
  /* {user?.isEmailVerified ? (
          <View style={[styles.verifiedBadge, {backgroundColor: '#e6f7eb'}]}>
            <MaterialIcons name="verified" size={16} color="#34a853" />
            <Text style={styles.verifiedText}>Verified Account</Text>
          </View>
        ) : (
          <View style={[styles.verifiedBadge, {backgroundColor: '#e6f7eb'}]}>
            <MaterialIcons name="verified" size={16} color="#d32f2f" />
            <Text style={{color: '#d32f2f'}}>Unverified Account</Text>
          </View>
        )} */
}
