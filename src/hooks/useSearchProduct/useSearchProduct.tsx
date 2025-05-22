import axiosInstance from '../../api/config';
import {useQuery} from '@tanstack/react-query';
import {Product} from '../useProducts/useProducts';
import {useEffect, useState} from 'react';

interface SearchProductsResponse {
  success: boolean;
  data: Product[];
}

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const searchProducts = async (searchQuery: string) => {
  const response = await axiosInstance.get<SearchProductsResponse>(
    'products/search',
    {
      params: {
        query: searchQuery,
      },
    },
  );

  return response.data;
};

const useSearchProduct = (searchQuery: string) => {
  const debouncedKeyword = useDebounce(searchQuery);
  console.log('Search Query: ', debouncedKeyword);
  return useQuery({
    queryKey: ['searchProduct', debouncedKeyword],
    queryFn: () => searchProducts(debouncedKeyword),
    staleTime: 1000 * 10 * 5, // 5 minutes
    enabled: searchQuery.trim().length > 0,
  });
};

export default useSearchProduct;
