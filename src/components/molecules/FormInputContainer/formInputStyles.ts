import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';
import {themes} from '../../../styles/theming';
import { spacing } from '../../../constants/spacing';

export const formInputStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: verticalScale(20),
      width: '100%',
    },
    label: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.inputLabel,
      marginBottom: verticalScale(spacing.xs),
    },
    input: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.LG),
      borderColor: theme.border,
      color: theme.text,
      borderWidth: 1,
      borderRadius: scale(10),
      padding: moderateScale(spacing.md),
      width: '100%',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.errorText,
      marginTop: verticalScale(spacing.sm),
    },
  });
