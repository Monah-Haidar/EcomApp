import {Text} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {formFooterTextStyles} from './formFooterTextStyles';

interface FormFooterTextProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

const FormFooterText = ({text, linkText, onPress}: FormFooterTextProps) => {
  const {theme} = useTheme();
  const styles = formFooterTextStyles(theme);

  return (
    <Text style={styles.footerText}>
      {text}{' '}
      <Text style={styles.footerLink} onPress={onPress}>
        {linkText}
      </Text>
    </Text>
  );
};

export default FormFooterText;
