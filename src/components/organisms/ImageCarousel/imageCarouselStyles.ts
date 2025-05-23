import { StyleSheet } from "react-native";
import { spacing } from "../../../constants/spacing";
import { themes } from "../../../styles/theming";


export const imageCarouselStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme, screenWidth: number) => StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: 250,
  },
  pagination: {
    position: 'absolute',
    bottom: spacing.md,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: spacing.xs / 2,
  },
  paginationDotActive: {
    backgroundColor: theme.buttonText,
    width: spacing.md_minus,
  },
});