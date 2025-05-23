import {useInfiniteQuery} from '@tanstack/react-query';

import axiosInstance from '../../api/config';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: Array<{url: string; _id: string}>;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  user: {
    _id: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalItems: number;
    limit: number;
  };
}

const fetchProducts = async ({pageParam = 1}) => {
  const response = await axiosInstance.get('products', {
    params: {
      page: pageParam,
      limit: 10,
    },
  });

  // console.log('Products Response: ', response.data.data);

  return response.data as ProductsResponse;
};

const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
    staleTime: 1000 * 10 * 5, 
  });
};

export default useProducts;
