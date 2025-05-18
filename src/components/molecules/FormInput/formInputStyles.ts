import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';
import {themes} from '../../../styles/theming';

export const formInputStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: verticalScale(20),
      width: '80%',
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.inputLabel,
      marginBottom: verticalScale(6),
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      backgroundColor: theme.inputFieldBackground,
      borderColor: theme.border,
      color: theme.text,
      borderWidth: 1,
      borderRadius: scale(6),
      padding: moderateScale(12),
      width: '100%',
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
  });
