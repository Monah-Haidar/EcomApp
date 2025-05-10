import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';

export const productDetailsStyles = (
  width: number,
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: 16,
    },
    image: {
      width: '100%',
      height: width * 0.8,
      borderRadius: 12,
      marginBottom: 16,
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.XL,
      color: theme.text,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.LG,
      marginBottom: 12,
      color: '#4CAF50',
    },
    description: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: FONT_SIZE.MD,
      color: theme.text,
      marginBottom: 24,
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
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.MD,
      color: theme.buttonText,
    },
  });
