import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import { moderateScale, scale, verticalScale } from '../../../utils/responsive';
import { normalizeFont } from '../../../utils/normalizeFont';
import { spacing } from '../../../constants/spacing';

// export const productDetailsStyles = (
//   width: number,
//   theme: typeof themes.lightTheme | typeof themes.darkTheme,
// ) =>
//   StyleSheet.create({
//     container: {
//       backgroundColor: theme.background,
//       padding: scale(16),
//     },
//     image: {
//       width: '100%',
//       height: width * 0.8,
//       borderRadius: scale(12),
//       marginBottom: verticalScale(16),
//     },
//     title: {
//       fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
//       fontSize: normalizeFont(FONT_SIZE.XL),
//       color: theme.text,
//     },
//     price: {
//       fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
//       fontSize: normalizeFont(FONT_SIZE.LG),
//       marginBottom: verticalScale(12),
//       color: '#4CAF50',
//     },
//     description: {
//       fontFamily: FONT_FAMILY.POPPINS_REGULAR,
//       fontSize: normalizeFont(FONT_SIZE.MD),
//       color: theme.text,
//       marginBottom: verticalScale(24),
//     },
//     buttonRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       gap: moderateScale(12),
//     },
//     button: {
//       flex: 1,
//       backgroundColor: theme.secondary,
//       paddingVertical: verticalScale(14),
//       borderRadius: scale(8),
//       alignItems: 'center',
//     },
//     addButton: {
//       backgroundColor: theme.primary,
//     },
//     buttonText: {
//       fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
//       fontSize: normalizeFont(FONT_SIZE.MD),
//       color: theme.buttonText,
//     },
//   });
export const productDetailsScreenStyles = (theme: any, screenWidth: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingBottom: spacing.xxl,
    },
    header: {
      backgroundColor: `${theme.cardBackground}DD`,
      paddingHorizontal: spacing.md_plus,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      position: 'relative',
      zIndex: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonText: {
      marginLeft: spacing.xs,
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.primary,
    },
    carouselContainer: {
      width: '100%',
    },
    detailsContainer: {
      padding: spacing.md_plus,
      gap: spacing.md,
    },
    titlePriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      flex: 1,
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XL),
      color: theme.text,
      marginRight: spacing.md,
    },
    price: {
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.primary,
    },
    description: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      lineHeight: normalizeFont(FONT_SIZE.MD) * 1.5,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: spacing.sm_plus,
    },
    infoText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.subheadingText,
    },
    mapSection: {
      marginTop: spacing.md_plus,
    },
    sectionTitle: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      marginBottom: spacing.sm,
    },
    map: {
      width: '100%',
      height: 200,
      borderRadius: spacing.radius_md,
      overflow: 'hidden',
    },
    contactSection: {
      backgroundColor: `${theme.primary}15`, // Primary color with 15% opacity
      borderRadius: spacing.radius_md,
      padding: spacing.md_plus,
      marginTop: spacing.md_plus,
    },
    emailText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.text,
      marginBottom: spacing.md,
    },
    emailButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md_plus,
      borderRadius: spacing.radius_md,
      width: '45%',
    },
    emailButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.buttonText,
      marginLeft: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.md_plus,
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: spacing.radius_md,
      padding: spacing.lg,
      width: '90%',
      maxWidth: 400,
    },
    modalTitle: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.text,
      marginBottom: spacing.md,
    },
    modalText: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.MD),
      color: theme.subheadingText,
      marginBottom: spacing.lg,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing.md,
    },
    modalCancelButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md_plus,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: spacing.radius_md,
    },
    modalCancelButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.text,
    },
    modalSaveButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md_plus,
      backgroundColor: theme.primary,
      borderRadius: spacing.radius_md,
    },
    modalSaveButtonText: {
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.buttonText,
    },
    // Loading skeleton styles
    loadingContainer: {
      padding: spacing.md_plus,
    },
    skeletonHeader: {
      height: spacing.md_plus,
      width: '30%',
      backgroundColor: theme.border,
      borderRadius: spacing.radius_sm,
      marginBottom: spacing.md_plus,
    },
    skeletonImage: {
      height: 250,
      backgroundColor: theme.border,
      borderRadius: spacing.radius_md,
      marginBottom: spacing.md_plus,
    },
    skeletonTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    skeletonTitle: {
      height: spacing.lg,
      width: '60%',
      backgroundColor: theme.border,
      borderRadius: spacing.radius_sm,
    },
    skeletonPrice: {
      height: spacing.lg,
      width: '25%',
      backgroundColor: theme.border,
      borderRadius: spacing.radius_sm,
    },
    skeletonDescription: {
      height: spacing.xxl,
      backgroundColor: theme.border,
      borderRadius: spacing.radius_sm,
      marginBottom: spacing.md,
    },
    skeletonText: {
      height: spacing.md,
      width: '80%',
      backgroundColor: theme.border,
      borderRadius: spacing.radius_sm,
      marginBottom: spacing.md,
    },
    skeletonMap: {
      height: 200,
      backgroundColor: theme.border,
      borderRadius: spacing.radius_md,
      marginTop: spacing.md_plus,
    },

    emptyStateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.lg,
      minHeight: 300, // Ensure minimum height for better visual appearance
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
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.md_plus,
    },
  });