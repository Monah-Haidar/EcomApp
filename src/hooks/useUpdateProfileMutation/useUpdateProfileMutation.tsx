import {useMutation, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {AxiosError} from 'axios';
import useAuthStore from '../../store/AuthStore/AuthStore';
import { useNavigation } from '@react-navigation/native';

interface UpdateProfileProps {
  firstName: string;
  lastName: string;
  //   email: string;
  profileImage?: {
    uri: string;
    type: string;
    name: string;
  } | null;
}

interface UpdateProfileResponse {
  success: boolean;
  data: {
    message: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profileImage: {
        url: string;
      } | null;
      isEmailVerified: boolean;
    };
  };
}

interface ErrorResponse {
  success: boolean;
  error: {
    statusCode: number;
    message: string;
  };
}

const updateProfile = async (data: UpdateProfileProps) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);

  if (data.profileImage) {
    formData.append('profileImage', data.profileImage as any);
  }

  const response = await axiosInstance.put<UpdateProfileResponse>(
    '/user/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userProfile']});
      navigation.goBack();
    },
    onError: error => {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        if (errorData.error?.message) return errorData.error.message;
      }

      return 'Failed to update profile. Please try again.';
    },
  });
};

export default useUpdateProfileMutation;
