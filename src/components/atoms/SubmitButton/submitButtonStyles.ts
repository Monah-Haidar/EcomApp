import {StyleSheet} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';
import {moderateScale, scale, verticalScale} from '../../../utils/responsive';
import {spacing} from '../../../constants/spacing';

export const submitButtonStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    submitButtonContainer: {
      paddingVertical: spacing.md,
      borderRadius: spacing.radius_md,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: spacing.sm,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      // fontSize: normalizeFont(FONT_SIZE.XL),
      fontSize: normalizeFont(FONT_SIZE.LG),
    },
    iconContainer: {
      marginRight: spacing.sm,
    },
  });
