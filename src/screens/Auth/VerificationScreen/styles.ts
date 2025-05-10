import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';

export const verificationStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
      padding: 24,
    },
    title: {
      color: theme.text,
      fontSize: 24,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    subHeading: {
      color: theme.text,
      fontSize: 14,
      marginBottom: 60,
      alignSelf: 'flex-start',
    },

    label: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '85%',
    },
    inputContainer: {
      marginBottom: 40,
    },
    input: {
      backgroundColor: theme.text,
      borderColor: theme.border,
      width: 50,
      height: 50,
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
      borderRadius: 10,
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
      width: '70%',
    },
    submitButtonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
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
  });
