export interface AuthContextType {
    isSignedIn: boolean;
    login: () => void;
    logout: () => void;
}