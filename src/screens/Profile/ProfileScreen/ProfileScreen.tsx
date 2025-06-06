import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {CrashTestButton} from '../../../components/atoms/CrashTestButton';
import {InfoRow} from '../../../components/molecules/InfoRow';
import {ProfileHeader} from '../../../components/organisms/ProfileHeader';
import {useUserProfile} from '../../../hooks/useUserProfile';
import {useAuthStore} from '../../../store/AuthStore';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {isPending} = useUserProfile();

  const clearTokens = useAuthStore(state => state.clearTokens);

  const globalStyles = useMemo(() => global(theme), [theme]);

  const handleNavigate = useCallback(
    () => navigation.navigate('EditProfile'),
    [navigation],
  );

  if (isPending) {
    return (
      <View
        style={[globalStyles.container, {backgroundColor: theme.background}]}>
        <Text style={{color: theme.text}}>Loading...</Text>
      </View>
    );
  }

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
          onPress={handleNavigate}
          variant="primary"
          icon={<Feather name="edit-2" size={16} color={theme.buttonText} />}
        />
        <SubmitButton
          text="Logout"
          onPress={clearTokens}
          variant="danger"
          icon={<Feather name="log-out" size={16} color="#d32f2f" />}
        />
        {/* Firebase Crashlytics Test Buttons - Remove in production */}
        {__DEV__ && (
          <View
            style={{
              marginTop: 20,
              padding: 16,
              backgroundColor: theme.cardBackground,
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                marginBottom: 12,
                textAlign: 'center',
              }}>
              🧪 Firebase Crashlytics Testing
            </Text>
            <CrashTestButton />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default React.memo(ProfileScreen);
