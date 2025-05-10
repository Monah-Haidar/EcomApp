import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';

export const verificationStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
      // paddingTop: 60,
      padding: 24,
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.XXXL,
      color: theme.text,
      textAlign: 'center',
    },
    subHeading: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.SM,
      color: theme.subheadingText,
      textAlign: 'center',
      marginBottom: 60,
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.XL,
      color: theme.text,
      marginBottom: 12,
    },
    inputContainer: {
      marginBottom: 40,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '85%',
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.LG,
      backgroundColor: theme.background,
      borderColor: theme.border,
      width: 50,
      height: 50,
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: 10,
    },

    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
      width: '70%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.LG,
      color: theme.buttonText,
    },
    generalError: {
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: 12,
      borderRadius: 6,
      marginBottom: 20,
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.XS,
      color: theme.errorText,
      marginTop: 6,
    },
  });
