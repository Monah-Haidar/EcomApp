import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { spacing } from "../../../constants/spacing";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";

export const formErrorDisplayStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md_minus,
    borderRadius: spacing.radius_sm,  
    marginBottom: spacing.md_plus,
  },
  errorText: {
    marginLeft: spacing.radius_sm,
    fontSize: normalizeFont(FONT_SIZE.SM),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: theme.errorText,
  },
  });
