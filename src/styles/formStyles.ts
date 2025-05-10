import {StyleSheet} from 'react-native';
import {themes} from './theming';
import {FONT_FAMILY, FONT_SIZE} from '../constants/font';
import { moderateScale, scale, verticalScale } from '../utils/responsive';
import { normalizeFont } from '../utils/normalizeFont';

export const formStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XXXL),
      color: theme.text,
      alignSelf: 'center',
      marginBottom: verticalScale(40),
    },
    inputContainer: {
      marginBottom: verticalScale(20),
      width: '80%',
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.inputLabel,
      marginBottom: verticalScale(6),
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      backgroundColor: theme.inputFieldBackground,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: scale(6),
      padding: moderateScale(12),
      width: '100%',
    },

    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: verticalScale(14),
      borderRadius: scale(30),
      alignItems: 'center',
      marginBottom: verticalScale(30),
      width: '50%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.buttonText,
    },
    footerText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
      textAlign: 'center',
    },
    footerLink: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.primary,
    },
    backButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: moderateScale(32),
      paddingTop: verticalScale(24),
    },

    // backButton: {
    //   borderColor: theme.border,
    //   borderWidth: 1,
    //   borderRadius: 100,
    //   height: 32,
    //   width: 32,
    // },
    // backButtonText: {
    //   fontSize: 18,
    //   fontWeight: 'bold',
    //   alignSelf: 'center',
    // },

    generalError: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: moderateScale(12),
      borderRadius: scale(6),
      marginBottom: verticalScale(20),
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: theme.errorText,
      marginTop: verticalScale(6),
    },
  });
