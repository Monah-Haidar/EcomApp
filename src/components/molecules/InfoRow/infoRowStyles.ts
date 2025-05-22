import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import { spacing } from '../../../constants/spacing';
import { normalizeFont } from '../../../utils/normalizeFont';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';

export const infoRowStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) => StyleSheet.create({
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md_plus,
    //   borderBottomWidth: 1,
    },
    iconContainer: {
      padding: spacing.sm,
      borderRadius: spacing.radius_sm,
      marginRight: spacing.md_minus,
      backgroundColor: '#e6f2ff'
    },
    infoTextContainer: {
      flex: 1,
    },
    infoLabel: {
      fontSize: normalizeFont(FONT_SIZE.SM),
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      color: theme.subheadingText
    },
    infoValue: {
      fontSize: normalizeFont(FONT_SIZE.MD),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      color: theme.text
    },
});
