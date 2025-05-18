import {StyleSheet} from 'react-native';
import {themes} from './theming';
import {FONT_FAMILY, FONT_SIZE} from '../constants/font';
import {moderateScale, scale, verticalScale} from '../utils/responsive';
import {normalizeFont} from '../utils/normalizeFont';

export const global = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100,
    },
    heading: {
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      fontSize: normalizeFont(FONT_SIZE.XXXL),
      color: theme.text,
      alignSelf: 'center',
      textAlign: 'center',
      // marginBottom: verticalScale(40),
    },
    subHeading: {
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      fontSize: normalizeFont(FONT_SIZE.SM),
      color: theme.subheadingText,
      textAlign: 'center',
      marginBottom: verticalScale(60),
    },
    backButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: moderateScale(32),
      // paddingTop: verticalScale(24),
    },
  });
