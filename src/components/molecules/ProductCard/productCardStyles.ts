import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { spacing } from "../../../constants/spacing";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";


export const productCardStyles = (theme: typeof themes.lightTheme | typeof themes.darkTheme,) => StyleSheet.create({
  container: {
    marginBottom: spacing.md_plus,
    marginHorizontal: spacing.xs,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: spacing.radius_md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: spacing.xxs },
    shadowOpacity: 0.1,
    shadowRadius: spacing.xs,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 160,
    backgroundColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    fontSize: normalizeFont(FONT_SIZE.MD),
    color: theme.text,
    marginRight: spacing.sm,
  },
  price: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: normalizeFont(FONT_SIZE.MD),
    color: theme.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  locationIcon: {
    marginRight: spacing.xs,
  },
  locationText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.subheadingText,
    flex: 1,
  },
  swipeAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 80,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 80 }],
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radius_sm,
    backgroundColor: theme.cardBackground,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  shareButtonText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.XS),
    color: theme.primary,
    marginLeft: spacing.xs,
  },
});