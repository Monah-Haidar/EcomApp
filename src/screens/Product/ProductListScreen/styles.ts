import {StyleSheet} from 'react-native';
import { themes } from '../../../styles/theming';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { moderateScale, scale, verticalScale } from '../../../utils/responsive';
import { normalizeFont } from '../../../utils/normalizeFont';

export const productListStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme,) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(16),
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: scale(10),
      padding: moderateScale(12),
      elevation: 2,
      margin: moderateScale(8),
    },
    image: {
      width: '100%',
      height: verticalScale(160),
      borderRadius: scale(8),
      marginBottom: verticalScale(10),
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: '#2e7d32',
    },
  });
