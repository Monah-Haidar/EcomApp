import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import { FONT_FAMILY } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export const profileImagePickerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    imagePickerContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    profileImageWrapper: {
      width: spacing.xxl * 2,
      height: spacing.xxl * 2,
      borderRadius: spacing.radius_circle,
      padding: spacing.xs_plus,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: spacing.xs},
      shadowOpacity: 0.1,
      shadowRadius: spacing.xs_plus,
      elevation: spacing.xs,
      backgroundColor: theme.cardBackground,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: spacing.radius_xxl,
    },
    placeholderImage: {
      width: '100%',
      height: '100%',
      borderRadius: spacing.radius_xxl,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.secondary,
    },
    placeholderText: {
      fontSize: 40,
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      color: theme.buttonText,
    },


    
  });
