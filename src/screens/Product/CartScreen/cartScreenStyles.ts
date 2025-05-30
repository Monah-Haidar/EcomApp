import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {spacing} from '../../../constants/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';

export const cartScreenStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: theme.background,
    //   // paddingTop: spacing.md,
    // },
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyText: {
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.subheadingText,
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
    },
    summaryContainer: {
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_md,
      padding: spacing.md,
      marginTop: spacing.md,
      marginBottom: spacing.lg,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    summaryLabel: {
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.subheadingText,
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    },
    summaryValue: {
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    },
    grandTotalLabel: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    },
    grandTotalValue: {
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.primary,
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
    },
  });
