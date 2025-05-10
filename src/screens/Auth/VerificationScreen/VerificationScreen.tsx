import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { verificationStyles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



type RootStackParamList = {
  Login: undefined;
};

const VerificationScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const numberOfInputs = 4;
  const [code, setCode] = useState(Array(numberOfInputs).fill(''));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const expectedCode = '1234';
  const styles = verificationStyles(theme);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    
    if (text && index < numberOfInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
  };

  const handleBackspace = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const fullCode = code.join('');

    if (fullCode.length < numberOfInputs || code.includes('')) {
      return setError('Please enter all digits');
    }

    if (fullCode === expectedCode) {
      Alert.alert('Success', 'Verification successful');
      navigation.navigate('Login');
    } else {
      return setError('Invalid credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
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
                  ref={(ref: TextInput | null) => {inputRefs.current[index] = ref}}
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

          <Pressable style={styles.submitButton} onPress={() => onSubmit()}>
            <Text style={styles.submitButtonText}>Create Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;
