import {StyleSheet} from 'react-native';
import { themes } from '../../../styles/theming';

export const productListStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme,) =>
  StyleSheet.create({
    container: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: theme.cardBackground,
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
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    price: {
      color: '#2e7d32',
      fontSize: 14,
    },
  });
