import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {submitButtonStyles} from './submitButtonStyles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {ReactNode} from 'react';

interface SubmitButtonProps {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  variant?: 'primary' | 'danger';
  icon?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

const SubmitButton = ({
  text,
  isLoading,
  onPress,
  variant = 'primary',
  icon,
  backgroundColor,
  textColor,
}: SubmitButtonProps) => {
  const {theme} = useTheme();
  const styles = submitButtonStyles(theme);

  // Determine background and text colors based on variant
  const getBgColor = () => {
    if (backgroundColor) return backgroundColor;
    switch (variant) {
      case 'danger':
        return '#ffebee'; // Light red background
      case 'primary':
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    switch (variant) {
      case 'danger':
        return '#d32f2f'; 
      case 'primary':
      default:
        return theme.buttonText;
    }
  };

  return (
    <Pressable
      style={({pressed}) => [styles.submitButtonContainer, { backgroundColor: getBgColor(),opacity: pressed ? 0.8 : 1}]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color={theme.buttonText} size="small" />
      ) : (
       <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.submitButtonText, { color: getTextColor() }]}>
            {text}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default SubmitButton;
