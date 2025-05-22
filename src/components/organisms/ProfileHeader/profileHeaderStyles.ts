import {StyleSheet} from 'react-native';
import {FONT_SIZE, FONT_FAMILY} from '../../../constants/font';
import {spacing} from '../../../constants/spacing';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';

export const profileHeaderStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    profileHeader: {
      alignItems: 'center',
      paddingTop: spacing.xxl,
      paddingBottom: spacing.xl_plus,
    },
    profileImageContainer: {
      position: 'relative',
    },
    userName: {
      marginTop: spacing.lg,
      fontSize: normalizeFont(FONT_SIZE.XXL),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    },
     cameraButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: spacing.sm_plus,
      borderRadius: spacing.radius_xl,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: spacing.xxs},
      shadowOpacity: 0.2,
      shadowRadius: spacing.xs - 1,
      elevation: spacing.xs - 1,
    },
  });
