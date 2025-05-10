import {StyleSheet} from 'react-native';
import { themes } from './theming';

export const formStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme) =>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 100,
    },
    title: {
      alignSelf: 'center',
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 40,
      
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
      borderColor: theme.border,
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
      // marginTop: 20,
    },
    signUpLink: {
      color: '#0047FF',
      fontWeight: '500',
    },
    submitButton: {
      backgroundColor: '#0047FF',
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 30,
      width: '50%'
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    backButton: {
      // position: 'absolute',
      // top: 20,
      // left: 20,
      
      borderColor: '#c4c4c4',
      borderWidth: 1,
      borderRadius: 100,
      height: 32,
      width: 32,
      
      // padding: 6,
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });
