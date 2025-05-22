import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import React from 'react';
import axiosInstance from '../../api/config';
import {useAuthStore} from '../../store/AuthStore';

interface LoginUserProps {
  email: string;
  password: string;
  token_expires_in: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ErrorResponse {
  success: boolean;
  error: {
    statusCode: number;
    message: string;
  };
}

const loginUser = async ({
  email,
  password,
  token_expires_in = '1min',
}: LoginUserProps) => {
  const response = await axiosInstance.post('auth/login', {
    email,
    password,
    token_expires_in,
  });

  //   console.log('Login data: ', {email, password, token_expires_in});
  //   console.log('Login Response: ', response.data);
  return response.data;
};

const useLoginMutation = () => {
//   const navigation = useNavigation();
  const setTokens = useAuthStore(state => state.setTokens);
  return useMutation<LoginResponse, Error, LoginUserProps>({
    mutationFn: loginUser,
    onSuccess: data => {
    //   console.log('Login Success: ', data.data);
      setTokens(data.data.accessToken, data.data.refreshToken);
    },
    onError: error => {
      if (error instanceof AxiosError && error.response?.data) {
        console.log('Login Error', error.response);
        const errorData = error.response.data as ErrorResponse;
        if (errorData.error?.message) return errorData.error.message;
      }
      return 'Network error. Please check your connection and try again.';
    },
  });
};

export default useLoginMutation;
