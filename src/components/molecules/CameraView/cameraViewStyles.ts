import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';
import {normalizeFont} from '../../../utils/normalizeFont';
import {moderateScale, scale, verticalScale} from '../../../utils/responsive';

export const cameraViewStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      padding: moderateScale(20),
    },
    permissionText: {
      fontSize: normalizeFont(18),
      fontFamily: 'Poppins-Medium',
      color: theme.text,
      textAlign: 'center',
      marginVertical: verticalScale(20),
    },
    permissionButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: moderateScale(30),
      paddingVertical: verticalScale(12),
      borderRadius: scale(8),
      marginBottom: verticalScale(10),
    },
    permissionButtonText: {
      fontSize: normalizeFont(16),
      fontFamily: 'Poppins-Medium',
      color: theme.buttonText,
    },
    closeButton: {
      backgroundColor: theme.border,
      paddingHorizontal: moderateScale(30),
      paddingVertical: verticalScale(12),
      borderRadius: scale(8),
    },
    closeButtonText: {
      fontSize: normalizeFont(16),
      fontFamily: 'Poppins-Medium',
      color: theme.text,
    },
    header: {
      position: 'absolute',
      top: verticalScale(50),
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: moderateScale(20),
      zIndex: 1,
    },
    headerCloseButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: moderateScale(8),
      borderRadius: scale(20),
    },
    bottomControls: {
      position: 'absolute',
      bottom: verticalScale(50),
      left: 0,
      right: 0,
      paddingHorizontal: moderateScale(20),
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    spacer: {
      flex: 1,
    },
    captureButton: {
      width: moderateScale(70),
      height: verticalScale(70),
      borderRadius: scale(35),
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    captureButtonDisabled: {
      opacity: 0.5,
    },
    captureButtonInner: {
      width: moderateScale(50),
      height: verticalScale(50),
      borderRadius: scale(25),
      backgroundColor: 'white',
    },
  });
