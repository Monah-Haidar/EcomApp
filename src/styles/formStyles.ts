import {StyleSheet} from 'react-native';

export const formStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: theme.background,
    },
    body: {
      flex: 1,
    },
    title: {
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 40,
    //   marginTop: 120,
    },
    label: {
      marginBottom: 6,
      fontWeight: '500',
      color: '#333',
    },
    inputContainer: {
      marginBottom: 20,
      width: '80%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#c4c4c4',
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
      width: '100%',
    },
    generalError: {
      backgroundColor: '#ffebee',
      color: '#d32f2f',
      padding: 12,
      borderRadius: 6,
      marginBottom: 20,
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      color: '#e53935',
      marginTop: 6,
      fontSize: 13,
    },
    signUpText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#333',
      marginTop: 20,
    },
    signUpLink: {
      color: '#0047FF',
      fontWeight: '500',
    },
    loginButton: {
      backgroundColor: '#0047FF',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      borderColor: '#c4c4c4',
      borderWidth: 1,
      borderRadius: 6,
      padding: 6,
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
