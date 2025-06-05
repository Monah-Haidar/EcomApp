import {useMutation, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../../api/config';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {notificationService} from '../../utils/notificationService';

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
  const formData = new FormData();

  formData.append('title', product.title);
  formData.append('description', product.description);

  formData.append('price', parseFloat(product.price).toString());

  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      formData.append('images', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.name || `image-${Date.now()}.jpg`,
      } as any); // Cast to any is needed for React Native FormData
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

    // // Debug logging for location
    // console.log('Location data being sent:', {
    //   latitude: product.location.latitude.toString(),
    //   longitude: product.location.longitude.toString(),
    //   locationName: product.location.name,
    //   locationJSON: JSON.stringify({
    //     name: product.location.name,
    //     latitude: product.location.latitude,
    //     longitude: product.location.longitude
    //   })
    // });
  }


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
      // console.log('Product added successfully:', data);
      const product = data?.data;

      notificationService(product);

      queryClient.invalidateQueries({queryKey: ['products']});
      navigation.goBack();
    },
    onError: error => {
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
