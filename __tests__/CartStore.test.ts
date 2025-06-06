import {renderHook, act, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCartStore from '../src/store/CartStore/CartStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('CartStore', () => {
  // Mock product data
  const mockProduct1 = {
    _id: 'product1',
    title: 'Test Product 1',
    description: 'This is test product 1',
    price: 29.99,
    images: [
      {
        url: '/uploads/image1.jpg',
        _id: 'img1',
      },
    ],
    user: {
      _id: 'user1',
      email: 'test@example.com',
    },
    location: {
      name: 'San Francisco, CA',
      latitude: 37.7749,
      longitude: -122.4194,
    },
  };

  const mockProduct2 = {
    _id: 'product2',
    title: 'Test Product 2',
    description: 'This is test product 2',
    price: 49.99,
    images: [
      {
        url: '/uploads/image2.jpg',
        _id: 'img2',
      },
    ],
    user: {
      _id: 'user2',
      email: 'test2@example.com',
    },
    location: {
      name: 'New York, NY',
      latitude: 40.7128,
      longitude: -74.0060,
    },
  };

  const mockProduct3 = {
    _id: 'product3',
    title: 'Test Product 3',
    description: 'This is test product 3',
    price: 99.99,
    images: [
      {
        url: '/uploads/image3.jpg',
        _id: 'img3',
      },
    ],
    user: {
      _id: 'user3',
      email: 'test3@example.com',
    },
    location: {
      name: 'Los Angeles, CA',
      latitude: 34.0522,
      longitude: -118.2437,
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAsyncStorage.getItem.mockResolvedValue(null);
    mockedAsyncStorage.setItem.mockResolvedValue();
    mockedAsyncStorage.removeItem.mockResolvedValue();
    
    // Reset the Zustand store state
    useCartStore.setState({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
  });

  describe('Initial State', () => {
    it('should initialize with empty cart state', () => {
      const {result} = renderHook(() => useCartStore());

      expect(result.current.cartItems).toEqual([]);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(0);
    });

    it('should have all required methods', () => {
      const {result} = renderHook(() => useCartStore());

      expect(typeof result.current.addToCart).toBe('function');
      expect(typeof result.current.removeFromCart).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
      expect(typeof result.current.updateQuantity).toBe('function');
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]).toEqual({
        ...mockProduct1,
        quantity: 1,
      });
      expect(result.current.totalPrice).toBe(29.99);
      expect(result.current.totalQuantity).toBe(1);
    });

    it('should increase quantity if item already exists in cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(2);
      expect(result.current.totalPrice).toBe(59.98);
      expect(result.current.totalQuantity).toBe(2);
    });

    it('should add multiple different items to cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct3);
      });

      expect(result.current.cartItems).toHaveLength(3);
      expect(result.current.totalPrice).toBe(179.97); // 29.99 + 49.99 + 99.99
      expect(result.current.totalQuantity).toBe(3);
    });

    it('should handle adding same item multiple times', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cartItems).toHaveLength(2);
      expect(result.current.cartItems[0].quantity).toBe(2);
      expect(result.current.cartItems[1].quantity).toBe(2);
      expect(result.current.totalPrice).toBe(159.96); // (29.99 * 2) + (49.99 * 2)
      expect(result.current.totalQuantity).toBe(4);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.removeFromCart('product1');
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]._id).toBe('product2');
      expect(result.current.totalPrice).toBeCloseTo(49.99, 2);
      expect(result.current.totalQuantity).toBe(1);
    });

    it('should remove item with multiple quantities correctly', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });      expect(result.current.totalPrice).toBeCloseTo(139.96, 2); // (29.99 * 3) + 49.99 = 89.97 + 49.99
      expect(result.current.totalQuantity).toBe(4);

      act(() => {
        result.current.removeFromCart('product1');
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]._id).toBe('product2');
      expect(result.current.totalPrice).toBeCloseTo(49.99, 2);
      expect(result.current.totalQuantity).toBe(1);
    });

    it('should handle removing non-existent item', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      const initialState = {
        cartItems: result.current.cartItems,
        totalPrice: result.current.totalPrice,
        totalQuantity: result.current.totalQuantity,
      };

      act(() => {
        result.current.removeFromCart('non-existent-id');
      });

      expect(result.current.cartItems).toEqual(initialState.cartItems);
      expect(result.current.totalPrice).toBe(initialState.totalPrice);
      expect(result.current.totalQuantity).toBe(initialState.totalQuantity);
    });

    it('should handle removing from empty cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.removeFromCart('product1');
      });

      expect(result.current.cartItems).toEqual([]);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct3);
      });

      expect(result.current.cartItems).toHaveLength(3);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toEqual([]);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(0);
    });

    it('should handle clearing empty cart', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toEqual([]);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should increase quantity by 1', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cartItems[0].quantity).toBe(1);

      act(() => {
        result.current.updateQuantity('product1', 1);
      });

      expect(result.current.cartItems[0].quantity).toBe(2);
      expect(result.current.totalPrice).toBe(59.98);
      expect(result.current.totalQuantity).toBe(2);
    });

    it('should decrease quantity by 1', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cartItems[0].quantity).toBe(3);      act(() => {
        result.current.updateQuantity('product1', -1);
      });

      expect(result.current.cartItems[0].quantity).toBe(2);
      expect(result.current.totalPrice).toBeCloseTo(59.98, 2);
      expect(result.current.totalQuantity).toBe(2);
    });

    it('should remove item when decreasing quantity below 1', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.updateQuantity('product1', -1);
      });      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]._id).toBe('product2');
      expect(result.current.totalPrice).toBeCloseTo(49.99, 2);
      expect(result.current.totalQuantity).toBe(1);
    });

    it('should handle invalid quantity type (default case)', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      const initialState = {
        cartItems: result.current.cartItems,
        totalPrice: result.current.totalPrice,
        totalQuantity: result.current.totalQuantity,
      };

      act(() => {
        result.current.updateQuantity('product1', 0); // Invalid type
      });

      expect(result.current.cartItems).toEqual(initialState.cartItems);
      expect(result.current.totalPrice).toBe(initialState.totalPrice);
      expect(result.current.totalQuantity).toBe(initialState.totalQuantity);
    });

    it('should handle updating quantity for non-existent item', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      const initialState = {
        cartItems: result.current.cartItems,
        totalPrice: result.current.totalPrice,
        totalQuantity: result.current.totalQuantity,
      };

      act(() => {
        result.current.updateQuantity('non-existent-id', 1);
      });

      expect(result.current.cartItems).toEqual(initialState.cartItems);
      expect(result.current.totalPrice).toBe(initialState.totalPrice);
      expect(result.current.totalQuantity).toBe(initialState.totalQuantity);
    });

    it('should handle multiple quantity updates correctly', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      act(() => {
        result.current.updateQuantity('product1', 1); // Increase product1
        result.current.updateQuantity('product2', 1); // Increase product2
        result.current.updateQuantity('product1', 1); // Increase product1 again
      });

      const product1Item = result.current.cartItems.find(item => item._id === 'product1');
      const product2Item = result.current.cartItems.find(item => item._id === 'product2');      expect(product1Item?.quantity).toBe(3);
      expect(product2Item?.quantity).toBe(2);
      expect(result.current.totalPrice).toBeCloseTo(189.95, 2); // (29.99 * 3) + (49.99 * 2)
      expect(result.current.totalQuantity).toBe(5);
    });
  });

  describe('Complex Cart Operations', () => {
    it('should handle mixed operations correctly', () => {
      const {result} = renderHook(() => useCartStore());

      // Add items
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct3);
        result.current.addToCart(mockProduct1); // Add duplicate
      });

      expect(result.current.cartItems).toHaveLength(3);
      expect(result.current.totalQuantity).toBe(4);

      // Update quantities
      act(() => {
        result.current.updateQuantity('product2', 1); // Increase
        result.current.updateQuantity('product3', -1); // Decrease to 0 (remove)
      });

      expect(result.current.cartItems).toHaveLength(2); // product3 removed
      expect(result.current.totalQuantity).toBe(4); // 2 + 2

      // Remove one item
      act(() => {
        result.current.removeFromCart('product1');
      });      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]._id).toBe('product2');
      expect(result.current.totalPrice).toBeCloseTo(99.98, 2); // 49.99 * 2
      expect(result.current.totalQuantity).toBe(2);
    });

    it('should maintain correct totals with decimal prices', () => {
      const productWithDecimal = {
        ...mockProduct1,
        price: 19.95,
      };

      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productWithDecimal);
        result.current.addToCart(productWithDecimal);
        result.current.addToCart(productWithDecimal);
      });      expect(result.current.totalPrice).toBeCloseTo(59.85, 2); // 19.95 * 3
      expect(result.current.totalQuantity).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle product with zero price', () => {
      const freeProduct = {
        ...mockProduct1,
        price: 0,
      };

      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(freeProduct);
        result.current.addToCart(freeProduct);
      });

      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(2);
      expect(result.current.cartItems[0].quantity).toBe(2);
    });

    it('should handle product with very high price', () => {
      const expensiveProduct = {
        ...mockProduct1,
        price: 999999.99,
      };

      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(expensiveProduct);
      });

      expect(result.current.totalPrice).toBe(999999.99);
      expect(result.current.totalQuantity).toBe(1);
    });

    it('should handle negative quantity updates gracefully', () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      // Try to decrease quantity multiple times
      act(() => {
        result.current.updateQuantity('product1', -1);
        result.current.updateQuantity('product1', -1); // Should not cause issues
      });

      expect(result.current.cartItems).toHaveLength(0);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.totalQuantity).toBe(0);
    });
  });

  describe('AsyncStorage Integration', () => {
    it('should call AsyncStorage.setItem when cart state changes', async () => {
      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      // Wait for async storage to be called
      await waitFor(() => {
        expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
      });

      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        'cart-storage',
        expect.stringContaining('"cartItems"')
      );
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      mockedAsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));
      
      // Mock console.error to avoid test output pollution
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const {result} = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[AsyncStorage] Error setting item cart-storage:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });
});
