import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { themes } from '../../../styles/theming';
import { normalizeFont } from '../../../utils/normalizeFont';
import { verticalScale } from '../../../utils/responsive';

export const productListScreenStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_sm,
      padding: spacing.md_minus,
      elevation: spacing.xxs,
      margin: spacing.sm,
    },
    image: {
      width: '100%',
      height: verticalScale(160),
      borderRadius: spacing.radius_sm,
      marginBottom: spacing.sm_plus,
    },
    title: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.XS),
      color: '#2e7d32',
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    errorText: {
      color: theme.errorText,
      fontSize: normalizeFont(FONT_SIZE.MD),
    },
    footerLoader: {
      padding: spacing.md_plus,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm_plus,
      paddingHorizontal: spacing.md_plus,
      paddingVertical: spacing.sm,
      backgroundColor: theme.background,
    },
    searchBarContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_md,
      paddingHorizontal: spacing.sm,
      height: 40,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md_plus,
      paddingVertical: spacing.sm,
      borderRadius: spacing.md_plus,
      backgroundColor: theme.cardBackground,
    },
    sortButtonText: {
      marginLeft: spacing.sm,
      color: theme.text,
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.background,
      borderTopLeftRadius: spacing.radius_lg,
      borderTopRightRadius: spacing.radius_lg,
      paddingHorizontal: spacing.lg_plus,
      paddingTop: spacing.lg_plus,
      paddingBottom: spacing.xl_plus,
    },
    modalTitle: {
      fontSize: normalizeFont(FONT_SIZE.LG),
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
      color: theme.text,
      marginBottom: spacing.lg_plus,
      textAlign: 'center',
    },
    sortOption: {
      paddingVertical: spacing.md_plus,
      paddingHorizontal: spacing.md_plus,
      borderRadius: spacing.radius_sm,
      marginBottom: spacing.sm,
      backgroundColor: theme.cardBackground,
    },
    selectedOption: {
      backgroundColor: theme.primary,
    },
    sortOptionText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text,
      textAlign: 'center',
    },
    selectedOptionText: {
      color: theme.background,
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
    },
    cancelButton: {
      marginTop: spacing.md_plus,
      paddingVertical: spacing.md_minus,
      paddingHorizontal: spacing.md_plus,
      borderRadius: spacing.radius_sm,
      backgroundColor: theme.border,
    },
    cancelButtonText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text,
      textAlign: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      backgroundColor: theme.background,
    },
    searchBar: {
      flex: 1,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
    },
    searchLoader: {
      marginHorizontal: spacing.sm,
    },
    emptyStateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.lg,
      minHeight: 300, 
    },
    emptyStateText: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text,
      marginTop: spacing.md_plus,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    clearSearchButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md_plus,
      backgroundColor: theme.primary,
      borderRadius: spacing.radius_sm,
    },
    clearSearchButtonText: {
      fontSize: normalizeFont(FONT_SIZE.SM),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      color: theme.background,
    },
    floatingActionButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: theme.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 999,
  },
  retryButton: {
    paddingVertical: spacing.sm_plus,
    paddingHorizontal: spacing.md_plus,
    backgroundColor: theme.primary,
    borderRadius: spacing.radius_sm,
    
  },
  retryButtonText: {
    fontSize: normalizeFont(FONT_SIZE.SM),
    fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    color: theme.text,
    
  },
  });
