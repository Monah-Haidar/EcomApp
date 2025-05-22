import {Text, View} from 'react-native';
import axiosInstance from '../../api/config';
import {useAuthStore} from '../../store/AuthStore';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

interface UserProfileResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profileImage?: {
        url: string;
      } | null;
      isEmailVerified: boolean;
      createdAt: string;
    };
  };
}

const fetchUserProfile = async () => {
  const response = await axiosInstance.get<UserProfileResponse>('user/profile');
  return response.data;
};

const useUserProfile = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  const query = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: isAuthenticated, // Only run if user is authenticated
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data?.success && query.data.data.user) {
      setUser(query.data.data.user);
    }
  }, [query.data, setUser]);

  return query;
};

export default useUserProfile;
