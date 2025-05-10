import {StyleSheet} from 'react-native';
import {themes} from './theming';

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
      marginTop: 100,
    },
    title: {
      color: theme.text,
      alignSelf: 'center',
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 40,
    },
    label: {
      color: theme.text,
      marginBottom: 6,
      fontWeight: '500',
    },
    inputContainer: {
      marginBottom: 20,
      width: '80%',
    },
    input: {
      backgroundColor: theme.inputContainerBackground,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      width: '100%',
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
      color: theme.errorText,
      marginTop: 6,
      fontSize: 13,
    },
    signUpText: {
      color: theme.text,
      textAlign: 'center',
      fontSize: 14,
    },
    signUpLink: {
      color: theme.primary,
      fontWeight: '500',
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
      width: '50%',
    },
    submitButtonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
    },
    backButton: {
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 100,
      height: 32,
      width: 32,
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });
