import {Text} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {formErrorDisplayStyles} from './formErrorDisplayStyles';

interface FormErrorDisplayProps {
  error: string;
}

const FormErrorDisplay = ({error}: FormErrorDisplayProps) => {
  const {theme} = useTheme();
  const styles = formErrorDisplayStyles(theme);
  return <Text style={styles.generalError}>{error}</Text>;
};

export default FormErrorDisplay;
