import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import { BackButton } from '../../../components/atoms/BackButton';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { VerificationCodeContainer } from '../../../components/molecules/VerificationCodeContainer';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { global } from '../../../styles/global';
import { useVerificationMutation } from '../../../hooks/useVerificationMutation';

type RootStackParamList = {
  Login: undefined;
};

const VerificationScreen = ({route}) => {
  const {theme} = useTheme();
  const {mutate, isPending, error} = useVerificationMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  


  const inputRefs = useRef<(TextInput | null)[]>([]);

  const numberOfInputs = 6;

  const [code, setCode] = useState(Array(numberOfInputs).fill(''));

  const {email} = route.params;

 

  const styles = global(theme);

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

  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const fullCode = code.join('');

    mutate({email, otp: fullCode});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <BackButton />

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Verification</Text>
            <Text style={styles.subHeading}>
              We have sent an OTP code via email to{' '}
              <Text style={{fontWeight: 'bold'}}>{email}</Text> ,
              please enter it below to verify you account
            </Text>
          </View>

          {error && <FormErrorDisplay error={error.message} />}

          <VerificationCodeContainer
            label="Enter Code"
            code={code}
            handleChange={handleChange}
            handleBackspace={handleBackspace}
            inputRefs={inputRefs}
          />

          <SubmitButton text="Create Account" onPress={onSubmit} isLoading={isPending} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;
