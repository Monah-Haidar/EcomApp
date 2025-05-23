

import {useMutation, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    statusCode: number;
  };
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  images?: Array<{
    uri: string;
    type: string;
    name: string;
    _id?: string; 
    url?: string; 
  }>;
}

const editProduct = async (product: Product) => {
  
  const formData = new FormData();
  
  
  const productId = product._id;
  
 
  formData.append('title', product.title);
  formData.append('description', product.description);
  
  formData.append('price', parseFloat(product.price).toString());

  
  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      
      if (!image._id) {
        
        formData.append('images', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.name || `image-${Date.now()}.jpg`,
        } as any); 
      }
    });
  }

  
  if (product.location) {
    
    formData.append('latitude', product.location.latitude.toString());
    formData.append('longitude', product.location.longitude.toString());
    formData.append('locationName', product.location.name);

    
    formData.append(
      'location',
      JSON.stringify({
        name: product.location.name,
        latitude: product.location.latitude,
        longitude: product.location.longitude,
      }),
    );
  }

  const response = await axiosInstance.put(`products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useEditProduct = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  
  return useMutation({
    mutationFn: editProduct,
    onSuccess: data => {
      console.log('Product updated successfully:', data);

      
      queryClient.invalidateQueries({queryKey: ['products']});
      queryClient.invalidateQueries({queryKey: ['product']});
      
      navigation.goBack();
    },
    onError: error => {
      console.error('Error updating product:', error);

      if (error instanceof AxiosError) {
        console.log('Status:', error.response?.status);
        console.log('Status text:', error.response?.statusText);
        console.log('Request config:', error.config);

        if (error.response?.data) {
          const errorData = error.response.data as ErrorResponse;
          console.log('API error response:', errorData);
          if (errorData.error?.message) return errorData.error.message;
        }
      }

      return 'Failed to update product. Please try again.';
    },
  });
};

export default useEditProduct;