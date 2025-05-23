import {StyleSheet} from 'react-native';
import {FONT_SIZE, FONT_FAMILY} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';
import {themes} from '../../../styles/theming';

export const editProfileScreenStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '85%',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    modalTitle: {
      fontSize: normalizeFont(20),
      fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
      marginBottom: 5,
    },
    modalSubtitle: {
      fontSize: normalizeFont(14),
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    modalOptionText: {
      flex: 1,
      fontSize: normalizeFont(16),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
      marginLeft: 15,
    },
    modalCancelButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      borderRadius: 8,
    },
    modalCancelText: {
      fontSize: normalizeFont(16),
      fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    },
  });
