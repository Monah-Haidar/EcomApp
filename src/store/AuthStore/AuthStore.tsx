
import { createContext, ReactNode, useContext, useState } from 'react';

export interface AuthContextType {
  isSignedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const login = () => {
    setIsSignedIn(true);
  }

  const logout = () => {
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{isSignedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);


