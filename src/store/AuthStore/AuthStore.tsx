import {createContext, ReactNode, useContext, useState} from 'react';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';


interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: {
    url: string;
  } | null;
  isEmailVerified: boolean;
}

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  hasStoreLoaded?: boolean;

  setHasStoreLoaded?: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  clearTokens: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      hasStoreLoaded: false,

      setHasStoreLoaded: () => set({hasStoreLoaded: true}),

      setTokens: (accessToken, refreshToken) =>
        set({accessToken, refreshToken, isAuthenticated: true}),

      setUser: user => set({user}),

      clearTokens: () => set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;