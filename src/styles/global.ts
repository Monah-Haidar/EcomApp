import {StyleSheet} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from '../constants/font';
import {normalizeFont} from '../utils/normalizeFont';
import {themes} from './theming';
import { spacing } from '../constants/spacing';

export const global = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      gap: 10,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 40,
      backgroundColor: theme.background,
    },
    headingContainer: {
      marginBottom: 8,
    },
    heading: {
      fontFamily: FONT_FAMILY.POPPINS_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XXXXXL),
      color: theme.text,
    },
    subHeading: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.LG),
      color: theme.subheadingText,
    },
    infoCard: {
      backgroundColor: theme.cardBackground,
      borderColor: theme.border,
      borderRadius: spacing.radius_lg,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: spacing.xs - 1,
      elevation: 1,
      marginBottom: spacing.md_plus,
    },
    cameraButton: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      padding: 10,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      backgroundColor: theme.primary,
    },
    imageSection: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    changePhotoText: {
      marginTop: 12,
      fontSize: normalizeFont(FONT_SIZE.SM),
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      color: theme.subheadingText,
    },
  });
