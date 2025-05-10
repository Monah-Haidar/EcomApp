import {useRef, useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {useNavigation} from '@react-navigation/native';
import {verificationStyles} from './styles';

const VerificationScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const numberOfInputs = 4;
  const [code, setCode] = useState(Array(numberOfInputs).fill(''));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef([]);
  const expectedCode = '1234';
  const styles = verificationStyles(theme);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return; // only allow digits

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input
    if (text && index < numberOfInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all inputs are filled, you can use the code
    const fullCode = newCode.join('');
    // if (fullCode.length === numberOfInputs && !newCode.includes('')) {
    //   Alert.alert('Code Entered', fullCode);
    // }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const fullCode = code.join('');

    if (fullCode.length < numberOfInputs || code.includes('')) {
      // Alert.alert('Incomplete Code', 'Please enter all digits');
      // return;
      return setError('Please enter all digits');
    }

    if (fullCode === expectedCode) {
      Alert.alert('Success', 'Verification successful');
      navigation.navigate('Login');
    } else {
      return setError('Invalid credentials');
      // Alert.alert('Error', 'The code is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please verify your email address</Text>
      <Text style={styles.subHeading}>
        We've sent you an email, please enter the code below.
      </Text>

      {error && <Text style={styles.generalError}>{error}</Text>}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Code</Text>
        <View style={styles.inputRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleBackspace(e, index)}
            />
          ))}
        </View>
      </View>

      {/* <Button title="Create Account" onPress={() => onSubmit()} /> */}

      <Pressable style={styles.submitButton} onPress={() => onSubmit()}>
        <Text style={styles.submitButtonText}>Create Account</Text>
      </Pressable>
    </View>
  );
};

export default VerificationScreen;
