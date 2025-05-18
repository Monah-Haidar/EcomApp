import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";
import { moderateScale, scale, verticalScale } from "../../../utils/responsive";

export const formErrorDisplayStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    generalError: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      backgroundColor: theme.errorTextContainer,
      color: theme.errorText,
      padding: moderateScale(12),
      borderRadius: scale(6),
      marginBottom: verticalScale(20),
      width: '80%',
      textAlign: 'center',
    },
    errorText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: theme.errorText,
      marginTop: verticalScale(6),
    },
  });
