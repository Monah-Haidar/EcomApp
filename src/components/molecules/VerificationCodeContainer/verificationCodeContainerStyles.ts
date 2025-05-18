import { StyleSheet } from 'react-native';
import { themes } from '../../../styles/theming';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { normalizeFont } from '../../../utils/normalizeFont';
import { verticalScale, moderateScale, scale } from '../../../utils/responsive';

export const verificationCodeContainerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    label: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.text,
      marginBottom: verticalScale(12),
    },
    inputContainer: {
      marginBottom: verticalScale(40),
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '85%',
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.LG),
      backgroundColor: theme.background,
      borderColor: theme.border,
      color: theme.text,
      width: moderateScale(50),
      height: verticalScale(50),
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: scale(10),
    },
  });