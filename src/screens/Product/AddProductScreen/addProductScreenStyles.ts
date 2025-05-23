import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {verticalScale} from '../../../utils/responsive';
import {normalizeFont} from '../../../utils/normalizeFont';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';

export const addProductScreenStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    title: {
      fontSize: normalizeFont(FONT_SIZE.XXXL),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      color: theme.text,
      backgroundColor: theme.background,
      textAlign: 'center',
      marginTop: verticalScale(20),
    },
    buttonContainer: {
      marginTop: verticalScale(20),
      marginBottom: verticalScale(40),
    },
    imageError: {
      color: theme.errorText,
      fontSize: normalizeFont(12),
      fontFamily: 'Poppins-Regular',
      marginTop: verticalScale(5),
    },
  });
