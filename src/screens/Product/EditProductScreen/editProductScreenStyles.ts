import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {verticalScale} from '../../../utils/responsive';
import {normalizeFont} from '../../../utils/normalizeFont';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';

export const editProductScreenStyles = (
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
    locationContainer: {
      marginTop: verticalScale(15),
      marginBottom: verticalScale(10),
    },
    label: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text,
      marginBottom: verticalScale(5),
    },
    locationInput: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingVertical: verticalScale(12),
      paddingHorizontal: verticalScale(10),
      backgroundColor: theme.inputFieldBackground,
    },
    locationText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      color: theme.text,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: verticalScale(10),
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text,
    },
  });
