import {Pressable, Text} from 'react-native';
import {submitButtonStyles} from './submitButtonStyles';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';


interface SubmitButtonProps {
    text: string;
    onPress: () => void;
}

const SubmitButton = ({text, onPress}: SubmitButtonProps) => {
  const {theme} = useTheme();
  const styles = submitButtonStyles(theme);
  return (
    <Pressable style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{text}</Text>
    </Pressable>
  );
};

export default SubmitButton;
