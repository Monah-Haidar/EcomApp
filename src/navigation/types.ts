import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

// Auth Stack Types
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Verification: {email?: string};
};

// Product Stack Types
export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: {productId: string};
  AddProduct: undefined;
  EditProduct: {productId: string};
};

// Profile Stack Types
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
};

// Main Tab Navigator Types
export type MainTabParamList = {
  Home: NavigatorScreenParams<ProductStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Cart: undefined;
};

// Root Navigator Types (AppNavigator)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Screen Props Types
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
  NativeStackScreenProps<ProductStackParamList, T>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Global navigation types for the entire app
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
