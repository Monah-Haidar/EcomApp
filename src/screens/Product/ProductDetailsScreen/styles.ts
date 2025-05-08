import {StyleSheet} from 'react-native';

export const productDetailsStyles = (width: number, theme: any) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#ffffff',
    },
    image: {
      width: '100%',
      height: width * 0.8,
      borderRadius: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
      color: '#333',
    },
    price: {
      fontSize: 20,
      fontWeight: '500',
      color: '#4CAF50',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: '#666',
      marginBottom: 24,
      lineHeight: 22,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    button: {
      flex: 1,
      backgroundColor: '#333',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#FF6B00',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });
