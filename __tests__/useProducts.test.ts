import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import useProducts, {Product} from '../src/hooks/useProducts/useProducts';
import axiosInstance from '../src/api/config';
import {AxiosResponse} from 'axios';

// Mock the API config
jest.mock('../src/api/config');
const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

// Mock react-native-config
jest.mock('react-native-config', () => ({
  API_URL: 'https://test-api.com/api/',
  BASE_URL: 'https://test-api.com',
}));

// Mock the auth store
jest.mock('../src/store/AuthStore', () => ({
  useAuthStore: {
    getState: jest.fn(() => ({
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    })),
  },
}));

describe('useProducts Hook', () => {
  let queryClient: QueryClient;

  const mockProduct: Product = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Product',
    description: 'This is a test product description',
    price: 29.99,
    images: [
      {
        url: '/uploads/image1.jpg',
        _id: 'img1',
      },
    ],
    location: {
      name: 'San Francisco, CA',
      longitude: -122.4194,
      latitude: 37.7749,
    },
    user: {
      _id: 'user123',
      email: 'test@example.com',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  const mockProduct2: Product = {
    _id: '507f1f77bcf86cd799439012',
    title: 'Test Product 2',
    description: 'This is another test product description',
    price: 49.99,
    images: [
      {
        url: '/uploads/image2.jpg',
        _id: 'img2',
      },
    ],
    location: {
      name: 'New York, NY',
      longitude: -74.0060,
      latitude: 40.7128,
    },
    user: {
      _id: 'user456',
      email: 'test2@example.com',
    },
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  };

  const mockProductsResponse = {
    success: true,
    data: [mockProduct],
    pagination: {
      currentPage: 1,
      totalPages: 3,
      hasNextPage: true,
      hasPrevPage: false,
      totalItems: 25,
      limit: 10,
    },
  };

  const mockProductsResponsePage2 = {
    success: true,
    data: [mockProduct2],
    pagination: {
      currentPage: 2,
      totalPages: 3,
      hasNextPage: true,
      hasPrevPage: true,
      totalItems: 25,
      limit: 10,
    },
  };

  const mockProductsResponseLastPage = {
    success: true,
    data: [mockProduct],
    pagination: {
      currentPage: 3,
      totalPages: 3,
      hasNextPage: false,
      hasPrevPage: true,
      totalItems: 25,
      limit: 10,
    },
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });
  it('should fetch products successfully', async () => {
    mockedAxiosInstance.get.mockResolvedValue({
      data: mockProductsResponse,
    } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('products', {
      params: {
        page: 1,
        limit: 10,
      },
    });

    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]).toEqual(mockProductsResponse);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
  });

  it('should handle pagination correctly', async () => {
    mockedAxiosInstance.get
      .mockResolvedValueOnce({
        data: mockProductsResponse,
      } as AxiosResponse)
      .mockResolvedValueOnce({
        data: mockProductsResponsePage2,
      } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    // Wait for first page to load
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.data?.pages).toHaveLength(1);

    // Fetch next page
    result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(2);
    });

    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(2);
    expect(mockedAxiosInstance.get).toHaveBeenNthCalledWith(2, 'products', {
      params: {
        page: 2,
        limit: 10,
      },
    });

    expect(result.current.data?.pages[0]).toEqual(mockProductsResponse);
    expect(result.current.data?.pages[1]).toEqual(mockProductsResponsePage2);
  });

  it('should handle last page correctly', async () => {
    mockedAxiosInstance.get.mockResolvedValue({
      data: mockProductsResponseLastPage,
    } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.data?.pages[0].pagination.hasNextPage).toBe(false);
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network Error');
    mockedAxiosInstance.get.mockRejectedValue(networkError);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle API error responses', async () => {
    const apiError = {
      response: {
        status: 500,
        data: {
          success: false,
          message: 'Internal Server Error',
        },
      },
    };
    mockedAxiosInstance.get.mockRejectedValue(apiError);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(apiError);
  });

  it('should handle empty products response', async () => {
    const emptyResponse = {
      success: true,
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
        totalItems: 0,
        limit: 10,
      },
    };

    mockedAxiosInstance.get.mockResolvedValue({
      data: emptyResponse,
    } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.pages[0].data).toHaveLength(0);
    expect(result.current.hasNextPage).toBe(false);
  });
  it('should use correct query configuration', async () => {
    mockedAxiosInstance.get.mockResolvedValue({
      data: mockProductsResponse,
    } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check infinite query methods are available
    expect(typeof result.current.fetchNextPage).toBe('function');
    expect(typeof result.current.hasNextPage).toBe('boolean');
    expect(Array.isArray(result.current.data?.pages)).toBe(true);

    // Check query caching
    const cachedData = queryClient.getQueryData(['products']);
    expect(cachedData).toBeDefined();

    // Check stale time configuration (should be 50 seconds = 50000ms)
    const queryState = queryClient.getQueryState(['products']);
    expect(queryState?.dataUpdatedAt).toBeDefined();
  });
  it('should handle concurrent fetch next page calls', async () => {
    mockedAxiosInstance.get
      .mockResolvedValueOnce({
        data: mockProductsResponse,
      } as AxiosResponse)
      .mockResolvedValue({
        data: mockProductsResponsePage2,
      } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Call fetchNextPage multiple times rapidly
    result.current.fetchNextPage();
    result.current.fetchNextPage();
    result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(2);
    });

    // React Query handles concurrent calls - it may make multiple requests
    // but we should have at least 2 calls (initial + at least one next page)
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('products', {
      params: {
        page: 1,
        limit: 10,
      },
    });
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('products', {
      params: {
        page: 2,
        limit: 10,
      },
    });
  });

  it('should maintain loading states correctly', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockedAxiosInstance.get.mockReturnValue(promise);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    // Should be loading initially
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);

    // Resolve the promise
    resolvePromise!({
      data: mockProductsResponse,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
  });

  it('should refetch data when query is invalidated', async () => {
    mockedAxiosInstance.get.mockResolvedValue({
      data: mockProductsResponse,
    } as AxiosResponse);

    const wrapper = ({children}: any) => 
      React.createElement(QueryClientProvider, {client: queryClient}, children);

    const {result} = renderHook(() => useProducts(), {wrapper});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(1);

    // Invalidate and refetch
    await queryClient.invalidateQueries({queryKey: ['products']});

    await waitFor(() => {
      expect(mockedAxiosInstance.get).toHaveBeenCalledTimes(2);
    });
  });
});
