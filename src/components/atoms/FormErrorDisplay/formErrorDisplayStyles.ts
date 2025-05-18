import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";
import { moderateScale, scale, verticalScale } from "../../../utils/responsive";
import { spacing } from "../../../constants/spacing";

export const formErrorDisplayStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    generalError: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.MD),
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: moderateScale(spacing.md),
      borderRadius: scale(10),
      marginBottom: verticalScale(20),
      width: '100%',
      textAlign: 'center',
    },
  });
