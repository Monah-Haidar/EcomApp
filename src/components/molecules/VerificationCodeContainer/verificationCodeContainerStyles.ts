import { StyleSheet } from 'react-native';
import { themes } from '../../../styles/theming';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { normalizeFont } from '../../../utils/normalizeFont';
import { verticalScale, moderateScale, scale } from '../../../utils/responsive';
import { spacing } from '../../../constants/spacing';

export const verificationCodeContainerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    label: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XXL),
      color: theme.text,
      marginBottom: verticalScale(spacing.xs),
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: scale(5),
      marginBottom: verticalScale(20),
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.XXL),
      backgroundColor: theme.background,
      borderColor: theme.border,
      color: theme.text,
      width: moderateScale(50),
      height: verticalScale(60),
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: scale(10),
    },
  });