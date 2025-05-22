import {StyleSheet} from 'react-native';
import {FONT_SIZE, FONT_FAMILY} from '../../../constants/font';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';
import { spacing } from '../../../constants/spacing';

export const customHeaderStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    AuthenticatedHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md_plus,
      paddingVertical: spacing.md_plus,
      backgroundColor: theme.background,
    },
    AuthenticatedHeaderTitle: {
      fontSize: normalizeFont(FONT_SIZE.LG),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      color: theme.text,
    },
  });
