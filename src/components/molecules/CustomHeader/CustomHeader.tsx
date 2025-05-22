import { Text, View } from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { BackButton } from '../../atoms/BackButton';
import { customHeaderStyles } from './customHeaderStyles';

interface CustomHeaderProps {
  text: string;
}


const CustomHeader = ({text}: CustomHeaderProps) => {
  const {theme} = useTheme();
  const styles = customHeaderStyles(theme);
  return (
    <View style={styles.AuthenticatedHeader}>
      <BackButton />
      <Text style={styles.AuthenticatedHeaderTitle}>{text}</Text>
      <View style={{width: 40}} />
    </View>
  );
};

export default CustomHeader;
