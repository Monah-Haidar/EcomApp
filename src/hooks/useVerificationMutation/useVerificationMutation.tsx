import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';

interface VerifyUserProps {
  email: string;
  otp: string;
}

interface VerificationResponse {
  success: boolean;
  data: {
    message: string;
    isEmailVerified: boolean;
  };
}

interface ErrorResponse {
  success: boolean;
  data: {
    message: string;
    isEmailVerified: boolean;
  };
}

const verifyUser = async ({email, otp}: VerifyUserProps) => {
  const response = await axiosInstance.post<VerificationResponse>('auth/verify-otp', {email, otp});

  console.log('Verification data: ', {email, otp});
  console.log('Verification Response: ', response.data);
  return response.data;
};

const useVerificationMutation = () => {
  const navigation = useNavigation();
  return useMutation<VerificationResponse,Error, VerifyUserProps>({
    mutationFn: verifyUser,
    onSuccess: data => {
      console.log('Verification Success: ', data);
      navigation.navigate('Login');
    },
    onError: error => {
    //   console.log('Verification Error: ', error);

      if (error instanceof AxiosError && error.response?.data) {
        console.log('Verification Error', error.response?.data);
        const errorData = error.response.data as ErrorResponse;

        if (errorData.data?.message) return errorData.data.message;
      }

      return 'Network error. Please check your connection and try again.';
    },
  });
};

export default useVerificationMutation;
