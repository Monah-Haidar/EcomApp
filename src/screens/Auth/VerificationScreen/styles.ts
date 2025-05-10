import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import { moderateScale, scale, verticalScale } from '../../../utils/responsive';
import { normalizeFont } from '../../../utils/normalizeFont';

export const verificationStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
      padding: moderateScale(24),
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XXXL),
      color: theme.text,
      textAlign: 'center',
    },
    subHeading: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.subheadingText,
      textAlign: 'center',
      marginBottom: verticalScale(60),
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.text,
      marginBottom: verticalScale(12),
    },
    inputContainer: {
      marginBottom: verticalScale(40),
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '85%',
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.LG),
      backgroundColor: theme.background,
      borderColor: theme.border,
      width: moderateScale(50),
      height: verticalScale(50),
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: scale(10),
    },

    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: scale(30),
      alignItems: 'center',
      marginBottom: verticalScale(30),
      width: '70%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.buttonText,
    },
    generalError: {
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: moderateScale(12),
      borderRadius: scale(6),
      marginBottom: verticalScale(20),
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: theme.errorText,
      marginTop: verticalScale(6),
    },
  });
