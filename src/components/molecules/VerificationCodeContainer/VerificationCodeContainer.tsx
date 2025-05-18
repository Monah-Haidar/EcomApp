import {Text, TextInput, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {verificationCodeContainerStyles} from './verificationCodeContainerStyles';
import {useEffect, useRef} from 'react';

interface VerificationCodeContainerProps {
  label: string;
  code: string[];
  handleChange: any;
  handleBackspace: any;
  inputRefs: any;
}

const VerificationCodeContainer = ({
  label,
  code,
  handleChange,
  handleBackspace,
  inputRefs
}: VerificationCodeContainerProps) => {
  

  const {theme} = useTheme();

  const styles = verificationCodeContainerStyles(theme);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            ref={(ref: TextInput | null) => {
              if (inputRefs.current) inputRefs.current[index] = ref;
            }}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleBackspace(e, index)}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
          />
        ))}
      </View>
    </View>
  );
};

export default VerificationCodeContainer;
