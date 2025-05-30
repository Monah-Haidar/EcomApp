import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: {url: string; _id: string}[];
  user: {_id: string; email: string};
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
};

export type CartItem = Product & {
  quantity: number;
};

type CartStoreState = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, type: number) => void;
};

const asyncStorage = {
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.error(`[AsyncStorage] Error setting item ${name}:`, e);
    }
  },
  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value;
    } catch (e) {
      console.error(`[AsyncStorage] Error getting item ${name}:`, e);
      return null;
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error(`[AsyncStorage] Error removing item ${name}:`, e);
    }
  },
};

const useCartStore = create<CartStoreState>()(
  persist(
    set => ({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,

      addToCart: item =>
        set(state => {
          const existingItem = state.cartItems.find(
            cartItem => cartItem._id === item._id,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(cartItem =>
                cartItem._id === item._id
                  ? {...cartItem, quantity: cartItem.quantity + 1}
                  : cartItem,
              ),
              totalPrice: state.totalPrice + item.price,
              totalQuantity: state.totalQuantity + 1,
            };
          } else {
            return {
              cartItems: [...state.cartItems, {...item, quantity: 1}],
              totalPrice: state.totalPrice + item.price,
              totalQuantity: state.totalQuantity + 1,
            };
          }
        }),

      removeFromCart: itemId =>
        set(state => {
          const itemToRemove = state.cartItems.find(
            cartItem => cartItem._id === itemId,
          );
          if (!itemToRemove) return state;

          return {
            cartItems: state.cartItems.filter(
              cartItem => cartItem._id !== itemId,
            ),
            totalPrice:
              state.totalPrice - itemToRemove.price * itemToRemove.quantity,
            totalQuantity: state.totalQuantity - itemToRemove.quantity,
          };
        }),

      clearCart: () =>
        set(() => ({
          cartItems: [],
          totalPrice: 0,
          totalQuantity: 0,
        })),

      updateQuantity: (itemId, type) =>
        set(state => {
          const item = state.cartItems.find(ci => ci._id === itemId);
          if (!item) return state;

          switch (type) {
            case 1: // Increase quantity
              return {
                cartItems: state.cartItems.map(ci =>
                  ci._id === itemId ? {...ci, quantity: ci.quantity + 1} : ci,
                ),
                totalPrice: state.totalPrice + item.price,
                totalQuantity: state.totalQuantity + 1,
              };
            case -1: // Decrease quantity
              if (item.quantity <= 1) {
                return {
                  cartItems: state.cartItems.filter(ci => ci._id !== itemId),
                  totalPrice: state.totalPrice - item.price * item.quantity,
                  totalQuantity: state.totalQuantity - item.quantity,
                };
              }
              return {
                cartItems: state.cartItems.map(ci =>
                  ci._id === itemId ? {...ci, quantity: ci.quantity - 1} : ci,
                ),
                totalPrice: state.totalPrice - item.price,
                totalQuantity: state.totalQuantity - 1,
              };
            default:
              
              return state;
          }

         
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
);

export default useCartStore;
