import { StyleSheet } from "react-native";
import { FONT_SIZE, FONT_FAMILY } from "../../../constants/font";
import { spacing } from "../../../constants/spacing";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";

export const cartItemCardStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
      marginBottom: spacing.sm,
    },
    deleteBackground: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#ff4444',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    deleteButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    deleteText: {
      color: '#fff',
      fontSize: normalizeFont(FONT_SIZE.XS),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      marginTop: spacing.xs,
    },
    cardContainer: {
      flexDirection: 'row',
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_md,
      padding: spacing.sm,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    itemContainer: {
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_md,
      padding: spacing.sm,
      flexDirection: 'row',
      marginBottom: spacing.sm,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: spacing.radius_sm,
      overflow: 'hidden',
      backgroundColor: theme.inputFieldBackground,
      marginRight: spacing.sm,
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: spacing.sm,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nameText: {
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.text,
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    },
    descriptionText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.subheadingText,
      marginBottom: spacing.md,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      marginRight: spacing.sm,
    },
    locationDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.primary,
      marginRight: spacing.xs,
    },
    locationText: {
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: theme.subheadingText,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quantityContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: spacing.radius_sm,
      overflow: 'hidden',
    },
    qtyButton: {
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs / 2,
      backgroundColor: theme.inputFieldBackground,
    },
    qtyText: {
      paddingHorizontal: spacing.xs + 4,
      paddingVertical: spacing.xs / 2,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
      textAlign: 'center',
    },
    totalText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    },
   
  });
