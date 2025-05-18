import {StyleSheet} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from '../constants/font';
import {normalizeFont} from '../utils/normalizeFont';
import {themes} from './theming';

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
    headingContainer: {
      marginBottom: 14,
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
  });
