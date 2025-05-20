import {StyleSheet} from 'react-native';
import {themes} from '../../../styles/theming';

export const profileImagePickerStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    imagePickerContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    imagePicker: {
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    placeholderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    placeholderText: {
      fontSize: 14,
      textAlign: 'center',
    },
  });
