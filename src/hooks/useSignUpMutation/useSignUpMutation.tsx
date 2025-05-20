import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';

interface SignUpUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: {
    uri: string;
    type: string;
    name: string;
  } | null;
}

interface SignUpResponse {
  success: boolean;
  data: {
    message: string;
  };
}

interface ErrorResponse {
  success: boolean;
  error: {
    statusCode: number;
    message: string;
  };
}

const signUpUser = async (data: SignUpUserProps) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('password', data.password);

  if (data.profileImage) {
    formData.append('profileImage', data.profileImage as any);
  }

  const response = await axiosInstance.post<SignUpResponse>(
    '/auth/signup',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  // console.log('User data: ', formData);
  // console.log('Response: ', response);

  return response.data;
};

const useSignUpMutation = () => {
  const navigation = useNavigation();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data, variables) => {
      // console.log('Sign up success: ', data.data.message);
      navigation.navigate('Verification', {email: variables.email});
    },

    onError: error => {
      if (error instanceof AxiosError && error.response?.data) {
        // console.log('Sign up Error', error.response);
        const errorData = error.response.data as ErrorResponse;

        if (errorData.error?.message) return errorData.error.message;
      }

      return 'Network error. Please check your connection and try again.';
    },
  });
};

export default useSignUpMutation;
