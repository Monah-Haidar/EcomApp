import {Pressable, Text} from 'react-native';
import {submitButtonStyles} from './submitButtonStyles';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';


interface SubmitButtonProps {
    text: string;
    isLoading?: boolean;
    onPress: () => void;
}

const SubmitButton = ({text, isLoading, onPress}: SubmitButtonProps) => {
  const {theme} = useTheme();
  const styles = submitButtonStyles(theme);
  return (
    <Pressable style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{isLoading ? 'Submitting...' : text}</Text>
    </Pressable>
  );
};

export default SubmitButton;
