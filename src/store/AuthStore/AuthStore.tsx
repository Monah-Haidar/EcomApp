import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: {
    url: string;
    type?: string;
    name?: string;
  } | null;
  isEmailVerified: boolean;
  createdAt: string;
}

const secureStorage: StateStorage = {
  setItem: async (name: string, value: string) => {
    try {
      // console.log(`[SecureStorage] Setting item: ${name}`);
      await RNSecureStorage.setItem(name, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (e) {
      console.error(`[SecureStorage] Error setting item ${name}:`, e);
    }
  },

  getItem: async (name: string) => {
    try {
      // console.log(`[SecureStorage] Getting item: ${name}`);

      if (await RNSecureStorage.exist(name)) {
        const value = await RNSecureStorage.getItem(name);
        return value;
      }
      console.log(`[SecureStorage] Item ${name} does not exist`);
      return null;
    } catch (e) {
      console.error(`[SecureStorage] Error getting item ${name}:`, e);
      return null;
    }
  },
  removeItem: async (name: string) => {
    try {
      console.log(`[SecureStorage] Removing item: ${name}`);

      if (await RNSecureStorage.exist(name)) {
        await RNSecureStorage.removeItem(name);
      } else {
        console.log(
          `[SecureStorage] Item ${name} does not exist, nothing to remove`,
        );
      }
    } catch (e) {
      console.error(`[SecureStorage] Error removing item ${name}:`, e);
    }
  },
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  setHydrated?: () => void;
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

      hydrated: false,

      setHydrated: () => set({hydrated: true}),

      setTokens: (accessToken, refreshToken) =>
        set({accessToken, refreshToken, isAuthenticated: true}),

      setUser: user => set({user}),
      

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),

      onRehydrateStorage: () => state => {
        // console.log('[STATE - REHYDRATE]');
        // console.log(
        //   '[onRehydrate - state] Starting rehydration process with state:',
        //   state ? 'State exists' : 'No state',
        // );

        state?.setHydrated?.();
        console.log('[onRehydrate - state] Set hydrated state to true');

        return (error: any, rehydratedState: any) => {
          console.log('[ERROR - REHYDRATE]');
          if (error) {
            console.error(
              '[onRehydrate - error] Error rehydrating auth store:',
              error,
            );
          } else {
            console.log(
              '[onRehydrate - else] Successfully rehydrated auth store',
            );

            console.log(
              '[onRehydrate - else] Auth state after rehydration:',
              rehydratedState ? 'User exists' : 'No user data',
            );
          }
        };
      },
    },
  ),
);

export default useAuthStore;
