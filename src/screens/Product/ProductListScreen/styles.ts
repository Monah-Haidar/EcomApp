import { StyleSheet } from "react-native";



export const productListStyles = (theme: any) =>  StyleSheet.create({
    container: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#fff',
      margin: 8,
      borderRadius: 10,
      padding: 12,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 160,
      borderRadius: 8,
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 14,
      color: '#2e7d32',
    },
    description: {
      fontSize: 12,
      color: '#666',
    },
  });
  