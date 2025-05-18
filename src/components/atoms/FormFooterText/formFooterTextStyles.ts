import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";




export const formFooterTextStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    footerText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.text,
      textAlign: 'center',
    },
    footerLink: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.primary,
    },
  });