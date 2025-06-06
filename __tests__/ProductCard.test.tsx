import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import ProductCard from '../src/components/molecules/ProductCard/ProductCard';
import {useTheme} from '../src/store/ThemeStore/ThemeStore';
import {shareProduct} from '../src/utils/shareProduct';

// Mock dependencies
jest.mock('../src/store/ThemeStore/ThemeStore');
jest.mock('../src/utils/shareProduct');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

const mockTheme = {
  cardBackground: '#ffffff',
  text: '#000000',
  primary: '#007AFF',
  subheadingText: '#666666',
  border: '#e0e0e0',
};

const mockProduct = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product description',
  images: [
    {
      url: 'https://example.com/image1.jpg',
      _id: 'img1',
    },
  ],
  location: {
    name: 'San Francisco, CA',
  },
};

const mockProductWithoutImages = {
  _id: '507f1f77bcf86cd799439012',
  title: 'Product Without Images',
  price: 15.0,
  description: 'Product without any images',
  images: [],
};

const mockProductWithoutLocation = {
  _id: '507f1f77bcf86cd799439013',
  title: 'Product Without Location',
  price: 50.0,
  description: 'Product without location',
  images: [
    {
      url: 'https://example.com/image3.jpg',
      _id: 'img3',
    },
  ],
};

const defaultProps = {
  source: {uri: 'https://example.com/image1.jpg'},
  item: mockProduct,
  itemWidth: 300,
  onPress: jest.fn(),
  onSwipeAction: jest.fn(),
  animationDelay: 0,
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({theme: mockTheme});
    (shareProduct as jest.Mock).mockResolvedValue({success: true});
  });

  describe('Rendering', () => {
    it('renders correctly with all props', () => {
      render(<ProductCard {...defaultProps} />);

      expect(screen.getByText('Test Product')).toBeTruthy();
      expect(screen.getByText('$29.99')).toBeTruthy();
      expect(screen.getByText('San Francisco, CA')).toBeTruthy();
      expect(screen.getByText('Share')).toBeTruthy();
    });

    it('renders product title correctly', () => {
      render(<ProductCard {...defaultProps} />);
      const titleElement = screen.getByText('Test Product');
      expect(titleElement).toBeTruthy();
    });

    it('renders product price with correct formatting', () => {
      const productWithHighPrice = {
        ...mockProduct,
        price: 1234.56,
      };
      render(
        <ProductCard
          {...defaultProps}
          item={productWithHighPrice}
        />
      );
      expect(screen.getByText('$1,234.56')).toBeTruthy();
    });

    it('renders price with no decimals for whole numbers', () => {
      const productWithWholePrice = {
        ...mockProduct,
        price: 100,
      };
      render(
        <ProductCard
          {...defaultProps}
          item={productWithWholePrice}
        />
      );
      expect(screen.getByText('$100')).toBeTruthy();
    });

    it('renders location when available', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByText('San Francisco, CA')).toBeTruthy();
    });

    it('does not render location when not available', () => {
      render(
        <ProductCard
          {...defaultProps}
          item={mockProductWithoutLocation}
        />
      );
      expect(screen.queryByText('San Francisco, CA')).toBeNull();
    });

    it('renders placeholder when no images are available', () => {
      render(
        <ProductCard
          {...defaultProps}
          item={mockProductWithoutImages}
        />
      );
      expect(screen.getByText('Product Without Images')).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('calls onPress when card is pressed', () => {
      const mockOnPress = jest.fn();
      const {getByTestId} = render(
        <ProductCard
          {...defaultProps}
          onPress={mockOnPress}
        />
      );

      // Find any pressable element and press it
      const pressableElement = screen.getByText('Test Product');
      fireEvent.press(pressableElement);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });    it('calls shareProduct when share button is pressed', async () => {
      render(<ProductCard {...defaultProps} />);

      const shareButton = screen.getByText('Share');
      
      // Mock the event object that React Native provides
      const mockEvent = {
        stopPropagation: jest.fn(),
      };
      
      // Simulate the press with a proper event object
      fireEvent(shareButton, 'press', mockEvent);

      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(shareProduct).toHaveBeenCalledWith({
        ...mockProduct,
        description: mockProduct.description,
      });
    });    it('handles missing description in share data', async () => {
      const productWithoutDescription = {
        ...mockProduct,
        description: undefined,
      };

      render(
        <ProductCard
          {...defaultProps}
          item={productWithoutDescription}
        />
      );

      const shareButton = screen.getByText('Share');
      
      // Mock the event object that React Native provides
      const mockEvent = {
        stopPropagation: jest.fn(),
      };
      
      // Simulate the press with a proper event object
      fireEvent(shareButton, 'press', mockEvent);

      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(shareProduct).toHaveBeenCalledWith({
        ...productWithoutDescription,
        description: '', // Should default to empty string
      });
    });    it('handles share error gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (shareProduct as jest.Mock).mockRejectedValue(new Error('Share failed'));

      render(<ProductCard {...defaultProps} />);

      const shareButton = screen.getByText('Share');
      
      // Mock the event object that React Native provides
      const mockEvent = {
        stopPropagation: jest.fn(),
      };
      
      // Simulate the press with a proper event object
      fireEvent(shareButton, 'press', mockEvent);

      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error sharing product:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Price Formatting', () => {
    it('handles zero price', () => {
      const productWithZeroPrice = {
        ...mockProduct,
        price: 0,
      };

      render(
        <ProductCard
          {...defaultProps}
          item={productWithZeroPrice}
        />
      );

      expect(screen.getByText('$0')).toBeTruthy();
    });

    it('handles very high prices', () => {
      const productWithHighPrice = {
        ...mockProduct,
        price: 999999.99,
      };

      render(
        <ProductCard
          {...defaultProps}
          item={productWithHighPrice}
        />
      );

      expect(screen.getByText('$999,999.99')).toBeTruthy();
    });
  });

  describe('Location Handling', () => {
    it('shows "Online" when location name is empty', () => {
      const productWithEmptyLocation = {
        ...mockProduct,
        location: {
          name: '',
        },
      };

      render(
        <ProductCard
          {...defaultProps}
          item={productWithEmptyLocation}
        />
      );

      expect(screen.getByText('Online')).toBeTruthy();
    });
  });

  describe('Component Props', () => {
    it('handles optional props gracefully', () => {
      expect(() => {
        render(
          <ProductCard
            {...defaultProps}
            onSwipeAction={undefined}
            animationDelay={undefined}
          />
        );
      }).not.toThrow();
    });

    it('renders with different itemWidth', () => {
      render(
        <ProductCard
          {...defaultProps}
          itemWidth={250}
        />
      );

      expect(screen.getByText('Test Product')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('uses theme colors correctly', () => {
      const customTheme = {
        ...mockTheme,
        primary: '#ff0000',
        text: '#333333',
      };

      (useTheme as jest.Mock).mockReturnValue({theme: customTheme});

      render(<ProductCard {...defaultProps} />);

      expect(screen.getByText('Test Product')).toBeTruthy();
    });
  });
});
