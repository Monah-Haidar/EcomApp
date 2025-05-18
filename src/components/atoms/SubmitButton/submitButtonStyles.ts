import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";
import { scale, verticalScale } from "../../../utils/responsive";




export const submitButtonStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: verticalScale(14),
      borderRadius: scale(30),
      alignItems: 'center',
      marginBottom: verticalScale(30),
      width: '50%',
    },
    submitButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.buttonText,
    },
  });