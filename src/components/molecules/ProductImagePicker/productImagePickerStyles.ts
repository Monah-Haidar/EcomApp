import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';
import {scale, verticalScale} from '../../../utils/responsive';

export const productImagePickerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: verticalScale(10),
    },
    title: {
      fontSize: normalizeFont(16),
      fontFamily: 'Poppins-Medium',
      color: theme.text,
      marginBottom: verticalScale(8),
    },
    scrollView: {
      flexDirection: 'row',
      width: '100%',
    },
    scrollViewContent: {
      paddingRight: scale(16),
      alignItems: 'center',
    },
    imageContainer: {
      position: 'relative',
      marginRight: scale(10),
    },
    image: {
      width: scale(100),
      height: verticalScale(100),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: theme.border,
    },
    removeButton: {
      position: 'absolute',
      top: verticalScale(-8),
      right: scale(-8),
      backgroundColor: theme.background,
      borderRadius: scale(12),
      zIndex: 1,
    },
    addButton: {
      width: scale(100),
      height: verticalScale(100),
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: scale(10),
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
    },
    addButtonText: {
      fontSize: normalizeFont(12),
      fontFamily: 'Poppins-Regular',
      color: theme.text,
      textAlign: 'center',
      marginTop: verticalScale(5),
    },    helperText: {
      fontSize: normalizeFont(12),
      fontFamily: 'Poppins-Regular',
      color: theme.subheadingText,
      marginTop: verticalScale(5),
    },
  });
