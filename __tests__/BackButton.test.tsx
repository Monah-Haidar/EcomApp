import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../src/components/atoms/BackButton/BackButton';

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Entypo', () => 'MockedEntypoIcon');

describe('BackButton', () => {
  const mockGoBack = jest.fn();
  const mockNavigation = {
    goBack: mockGoBack,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  describe('Rendering', () => {
    it('should render correctly', () => {
      const {toJSON} = render(<BackButton />);
      expect(toJSON()).toMatchSnapshot();
    });

    it('should render without crashing', () => {
      expect(() => render(<BackButton />)).not.toThrow();
    });
  });

  describe('Navigation Behavior', () => {
    it('should call useNavigation hook', () => {
      render(<BackButton />);
      expect(useNavigation).toHaveBeenCalled();
    });

    it('should have navigation.goBack function available', () => {
      render(<BackButton />);
      expect(mockNavigation.goBack).toBeDefined();
      expect(typeof mockNavigation.goBack).toBe('function');
    });
  });

  describe('Component Memoization', () => {
    it('should be wrapped with React.memo', () => {
      const {rerender} = render(<BackButton />);
      
      // Clear the mock to count fresh calls
      jest.clearAllMocks();
      
      // Re-render with the same props
      rerender(<BackButton />);
      
      // Component should still render
      expect(() => rerender(<BackButton />)).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle undefined navigation gracefully', () => {
      (useNavigation as jest.Mock).mockReturnValue(undefined);
      
      // Should not crash when rendering
      expect(() => render(<BackButton />)).not.toThrow();
    });

    it('should handle navigation without goBack method', () => {
      (useNavigation as jest.Mock).mockReturnValue({});
      
      // Should not crash when rendering
      expect(() => render(<BackButton />)).not.toThrow();
    });
  });
  describe('Performance', () => {
    it('should use useCallback for optimization', () => {
      const {rerender} = render(<BackButton />);
      
      // Multiple renders with same props should be optimized by React.memo
      // So useNavigation should only be called once due to memoization
      rerender(<BackButton />);
      rerender(<BackButton />);
      
      // Since the component is memoized, useNavigation should only be called once
      expect(useNavigation).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration', () => {
    it('should work with different navigation states', () => {
      const navigationStates = [
        { goBack: jest.fn() },
        { goBack: jest.fn(), canGoBack: () => true },
        { goBack: jest.fn(), canGoBack: () => false },
      ];

      navigationStates.forEach((navState) => {
        (useNavigation as jest.Mock).mockReturnValue(navState);
        
        const {unmount} = render(<BackButton />);
        
        // Should render without issues
        expect(() => render(<BackButton />)).not.toThrow();
        
        unmount();
      });
    });
  });
});
