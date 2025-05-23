import {useMutation, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';
import { AxiosError } from 'axios';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    statusCode: number;
  };
}

interface Product {
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
    }>;
}

const addProduct = async (product: Product) => {
  // Create form data object
  const formData = new FormData();
    // Add basic product info
  formData.append('title', product.title);
  formData.append('description', product.description);
  // Ensure price is sent as a valid number string
  formData.append('price', parseFloat(product.price).toString());

  // Add images - this is the critical part for React Native
  if (product.images && product.images.length > 0) {
    product.images.forEach((image) => {
      // For React Native, we need to append each image with the correct format
      // Note: The server expects 'images' as the field name
      formData.append('images', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.name || `image-${Date.now()}.jpg`,
      } as any); // Cast to any is needed for React Native FormData
    });
  }  // Add location data
  if (product.location) {
    // Try both individual fields and JSON approaches
    formData.append('latitude', product.location.latitude.toString());
    formData.append('longitude', product.location.longitude.toString());
    formData.append('locationName', product.location.name);
    
    // Also try as a JSON string in case server expects this format
    formData.append('location', JSON.stringify({
      name: product.location.name,
      latitude: product.location.latitude,
      longitude: product.location.longitude
    }));
    
    // Debug logging for location
    console.log('Location data being sent:', {
      latitude: product.location.latitude.toString(),
      longitude: product.location.longitude.toString(),
      locationName: product.location.name,
      locationJSON: JSON.stringify({
        name: product.location.name,
        latitude: product.location.latitude,
        longitude: product.location.longitude
      })
    });
  }

  // Log the FormData for debugging
  console.log('Sending product data to API:', {
    title: product.title,
    description: product.description,
    price: product.price,
    location: product.location,
    imagesCount: product.images?.length || 0
  });

  const response = await axiosInstance.post('products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: data => {
      console.log('Product added successfully:', data);

      queryClient.invalidateQueries({queryKey: ['products']});
      navigation.goBack();
    },    onError: error => {
        console.error('Error adding product:', error);
        
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
    
        return 'Failed to add product. Please try again.';
      },
  });
};

export default useAddProduct;
