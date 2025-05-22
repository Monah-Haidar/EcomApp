import { StyleSheet } from "react-native";
import { themes } from "../../../styles/theming";
import { spacing } from "../../../constants/spacing";
import { normalizeFont } from "../../../utils/normalizeFont";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";


export const badgeStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
      verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md_minus,
      paddingVertical: spacing.xs,
      borderRadius: spacing.md_plus,
    },
    verifiedText: {
      marginLeft: spacing.xs_plus,
      fontSize: normalizeFont(FONT_SIZE.SM),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      
    },
  });