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
      gap: 20,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 40,
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
  });
