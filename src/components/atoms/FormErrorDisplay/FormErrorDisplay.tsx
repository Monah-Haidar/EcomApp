import {Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {formErrorDisplayStyles} from './formErrorDisplayStyles';
import Feather from 'react-native-vector-icons/Feather';

interface FormErrorDisplayProps {
  error: string;
}

const FormErrorDisplay = ({error}: FormErrorDisplayProps) => {
  const {theme} = useTheme();
  const styles = formErrorDisplayStyles(theme);

  return (
    <View style={[styles.errorContainer, {backgroundColor: '#ffebee'}]}>
      <Feather name="alert-circle" size={18} color="#d32f2f" />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default FormErrorDisplay;
