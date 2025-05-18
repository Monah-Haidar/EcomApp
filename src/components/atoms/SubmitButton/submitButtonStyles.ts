import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";
import { moderateScale, scale, verticalScale } from "../../../utils/responsive";
import { spacing } from "../../../constants/spacing";




export const submitButtonStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: scale(10),
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(spacing.md),
      width: '100%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.buttonText,
    },
  });