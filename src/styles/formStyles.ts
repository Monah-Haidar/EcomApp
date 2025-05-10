import {StyleSheet} from 'react-native';
import {themes} from './theming';
import {FONT_FAMILY, FONT_SIZE} from '../constants/font';

export const formStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // marginTop: 100,
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.XXXL,
      color: theme.text,
      alignSelf: 'center',
      marginBottom: 40,
    },
    inputContainer: {
      marginBottom: 20,
      width: '80%',
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.SM,
      color: theme.inputLabel,
      marginBottom: 6,
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.MD,
      backgroundColor: theme.inputFieldBackground,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 6,
      padding: 12,
      width: '100%',
    },

    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
      width: '50%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.LG,
      color: theme.buttonText,
    },
    footerText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.SM,
      color: theme.text,
      textAlign: 'center',
    },
    footerLink: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.SM,
      color: theme.primary,
      fontWeight: '500',
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
      fontSize: FONT_SIZE.SM,
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: 12,
      borderRadius: 6,
      marginBottom: 20,
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.XS,
      color: theme.errorText,
      marginTop: 6,
    },
  });
