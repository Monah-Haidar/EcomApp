import { StyleSheet } from "react-native";

export const verificationStyles = (theme: any) => StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // backgroundColor: theme.background,
      paddingTop: 60,
      padding: 20,
      // backgroundColor: theme.background
    },
    heading: {
      fontSize: 24,
      marginBottom: 8,
    },
    subHeading: {
      fontSize: 14,
      marginBottom: 60,
    },
  
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputContainer: {
      marginBottom: 40,
      // width: '80%',
    },
    input: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      textAlign: 'center',
      fontSize: 20,
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
    },
  });