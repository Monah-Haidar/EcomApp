import {StyleSheet} from 'react-native';
import { themes } from '../../../styles/theming';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';

export const productListStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme,) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 12,
      elevation: 2,
      margin: 8,
    },
    image: {
      width: '100%',
      height: 160,
      borderRadius: 8,
      marginBottom: 10,
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: FONT_SIZE.SM,
      color: theme.text,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: FONT_SIZE.XS,
      color: '#2e7d32',
    },
  });
