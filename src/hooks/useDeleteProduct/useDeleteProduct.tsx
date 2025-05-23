import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';

const deleteProduct = async (productId: string) => {
  const response = await axiosInstance.delete('products/' + productId);
  return response.data;
};

const useDeleteProduct = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
      navigation.goBack();
    },
    onError: (error: any) => {
      console.error('Error deleting product:', error);
      
    },
  });
};

export default useDeleteProduct;
