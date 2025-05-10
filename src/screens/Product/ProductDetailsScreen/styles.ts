import {StyleSheet} from 'react-native';
import { themes } from '../../../styles/theming';

export const productDetailsStyles = (width: number, theme: typeof themes.lightTheme | typeof themes.darkTheme,) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.background,
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
      color: theme.text,
    },
    price: {
      fontSize: 20,
      fontWeight: '500',
      color: '#4CAF50',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: theme.text,
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
      backgroundColor: theme.secondary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: theme.text,
      fontWeight: '600',
      fontSize: 16,
    },
  });
