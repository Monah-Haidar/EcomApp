/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: 'GestureHandlerRootView',
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  FlingGestureHandler: 'FlingGestureHandler',
  ForceTouchGestureHandler: 'ForceTouchGestureHandler',
  LongPressGestureHandler: 'LongPressGestureHandler',
  PinchGestureHandler: 'PinchGestureHandler',
  RotationGestureHandler: 'RotationGestureHandler',
  State: {},
  Directions: {},
}));

// Mock react-native-bootsplash
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

// Mock react-native-onesignal
jest.mock('react-native-onesignal', () => ({
  OneSignal: {
    Debug: {
      setLogLevel: jest.fn(),
    },
    initialize: jest.fn(),
    Notifications: {
      requestPermission: jest.fn(),
    },
  },
  LogLevel: {
    Verbose: 1,
    None: 0,
  },
}));

// Mock react-native-config
jest.mock('react-native-config', () => ({
  ONESIGNAL_APP_ID: 'mock-app-id',
}));

// Mock navigation
jest.mock('../src/navigation/navigator', () => ({
  AppNavigator: 'AppNavigator',
}));

// Mock theme store
jest.mock('../src/store/ThemeStore/ThemeStore', () => ({
  ThemeProvider: ({children}: {children: React.ReactNode}) => children,
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
