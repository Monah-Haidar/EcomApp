import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import { moderateScale, scale, verticalScale } from '../../../utils/responsive';
import { normalizeFont } from '../../../utils/normalizeFont';

export const productDetailsStyles = (
  width: number,
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: scale(16),
    },
    image: {
      width: '100%',
      height: width * 0.8,
      borderRadius: scale(12),
      marginBottom: verticalScale(16),
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.text,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      marginBottom: verticalScale(12),
      color: '#4CAF50',
    },
    description: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      marginBottom: verticalScale(24),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(12),
    },
    button: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingVertical: verticalScale(14),
      borderRadius: scale(8),
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.buttonText,
    },
  });
