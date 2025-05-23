import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';
import {scale, verticalScale} from '../../../utils/responsive';

export const locationPickerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: scale(15),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerText: {
      fontSize: normalizeFont(18),
      fontFamily: 'Poppins-SemiBold',
      color: theme.text,
    },
    closeButton: {
      padding: scale(5),
    },
    map: {
      flex: 1,
    },
    footer: {
      padding: scale(15),
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    confirmButton: {
      backgroundColor: theme.primary,
      paddingVertical: verticalScale(12),
      borderRadius: scale(8),
      alignItems: 'center',
    },
    confirmButtonText: {
      fontSize: normalizeFont(16),
      fontFamily: 'Poppins-Medium',
      color: theme.buttonText,
    },
  });
