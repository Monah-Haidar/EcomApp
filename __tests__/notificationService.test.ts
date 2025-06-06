import {notificationService} from '../src/utils/notificationService';
import {Product} from '../src/hooks/useProducts/useProducts';
import Config from 'react-native-config';

// Mock react-native-config
jest.mock('react-native-config', () => ({
  ONESIGNAL_API_KEY: 'test-api-key',
  ONESIGNAL_APP_ID: 'test-app-id',
  ONESIGNAL_API_URL: 'https://api.onesignal.com/notifications?c=push',
  BASE_URL: 'https://test-base-url.com',
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods
const consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(),
  error: jest.spyOn(console, 'error').mockImplementation(),
};

describe('notificationService', () => {
  const mockProduct: Product = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Product',
    description: 'This is a test product description',
    price: 29.99,
    images: [
      {
        url: '/uploads/image1.jpg',
        _id: 'img1',
      },
      {
        url: '/uploads/image2.jpg',
        _id: 'img2',
      },
    ],
    location: {
      name: 'San Francisco, CA',
      longitude: -122.4194,
      latitude: 37.7749,
    },
    user: {
      _id: 'user123',
      email: 'test@example.com',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  const mockProductWithoutImages: Product = {
    ...mockProduct,
    _id: '507f1f77bcf86cd799439012',
    title: 'Product Without Images',
    images: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock
    (fetch as jest.Mock).mockReset();
  });

  afterAll(() => {
    // Restore console methods
    consoleSpy.log.mockRestore();
    consoleSpy.error.mockRestore();
  });

  describe('Configuration Validation', () => {
    it('should not send notification when ONESIGNAL_API_KEY is missing', () => {
      // Mock missing API key
      (Config as any).ONESIGNAL_API_KEY = undefined;

      notificationService(mockProduct);

      expect(consoleSpy.error).toHaveBeenCalledWith('OneSignal configuration missing');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should not send notification when ONESIGNAL_APP_ID is missing', () => {
      // Mock missing APP ID
      (Config as any).ONESIGNAL_APP_ID = undefined;

      notificationService(mockProduct);

      expect(consoleSpy.error).toHaveBeenCalledWith('OneSignal configuration missing');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should not send notification when both config values are missing', () => {
      // Mock missing both values
      (Config as any).ONESIGNAL_API_KEY = undefined;
      (Config as any).ONESIGNAL_APP_ID = undefined;

      notificationService(mockProduct);

      expect(consoleSpy.error).toHaveBeenCalledWith('OneSignal configuration missing');
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('Successful Notification Sending', () => {
    beforeEach(() => {
      // Ensure config values are set
      (Config as any).ONESIGNAL_API_KEY = 'test-api-key';
      (Config as any).ONESIGNAL_APP_ID = 'test-app-id';
      (Config as any).BASE_URL = 'https://test-base-url.com';
    });

    it('should send notification with correct payload when product has images', async () => {
      const mockResponse = {
        id: 'notification-id-123',
        recipients: 150,
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      notificationService(mockProduct);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.onesignal.com/notifications?c=push',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: 'test-api-key',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            app_id: 'test-app-id',
            headings: {
              en: 'New Product Added',
            },
            contents: {
              en: 'A new product has been added: Test Product',
            },
            big_picture: 'https://test-base-url.com/uploads/image1.jpg',
            large_icon: 'https://media.onesignal.com/automated_push_templates/price_drop_alert_template.png',
            url: 'ecomapp://products/507f1f77bcf86cd799439011',
            included_segments: ['Active Subscriptions'],
          }),
        }
      );

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.log).toHaveBeenCalledWith(mockResponse);
    });    it('should send notification when product has no images', async () => {
      const mockResponse = {
        id: 'notification-id-456',
        recipients: 75,
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      notificationService(mockProductWithoutImages);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.onesignal.com/notifications?c=push',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            accept: 'application/json',
            Authorization: 'test-api-key',
            'content-type': 'application/json',
          }),
          body: expect.stringContaining('"big_picture":"https://test-base-url.comundefined"'),
        })
      );

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.log).toHaveBeenCalledWith(mockResponse);
    });

    it('should use default OneSignal API URL when ONESIGNAL_API_URL is not configured', () => {
      // Remove the custom API URL
      (Config as any).ONESIGNAL_API_URL = undefined;

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      notificationService(mockProduct);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.onesignal.com/notifications?c=push',
        expect.any(Object)
      );
    });

    it('should use custom OneSignal API URL when configured', () => {
      const customUrl = 'https://custom-onesignal-api.com/notifications';
      (Config as any).ONESIGNAL_API_URL = customUrl;

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      notificationService(mockProduct);

      expect(fetch).toHaveBeenCalledWith(
        customUrl,
        expect.any(Object)
      );
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      // Ensure config values are set
      (Config as any).ONESIGNAL_API_KEY = 'test-api-key';
      (Config as any).ONESIGNAL_APP_ID = 'test-app-id';
    });

    it('should handle fetch network errors gracefully', async () => {
      const networkError = new Error('Network request failed');
      (fetch as jest.Mock).mockRejectedValue(networkError);

      notificationService(mockProduct);

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.error).toHaveBeenCalledWith(networkError);
    });

    it('should handle response JSON parsing errors', async () => {
      const jsonError = new Error('Invalid JSON response');
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockRejectedValue(jsonError),
      });

      notificationService(mockProduct);

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.error).toHaveBeenCalledWith(jsonError);
    });

    it('should handle HTTP error responses', async () => {
      const errorResponse = {
        errors: ['Invalid API key'],
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(errorResponse),
      });

      notificationService(mockProduct);

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.log).toHaveBeenCalledWith(errorResponse);
    });
  });

  describe('Payload Construction', () => {
    beforeEach(() => {
      // Ensure config values are set
      (Config as any).ONESIGNAL_API_KEY = 'test-api-key';
      (Config as any).ONESIGNAL_APP_ID = 'test-app-id';
      (Config as any).BASE_URL = 'https://test-base-url.com';
    });

    it('should construct correct notification payload with product title', () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      const productWithLongTitle = {
        ...mockProduct,
        title: 'This is a very long product title that should be included in the notification',
      };

      notificationService(productWithLongTitle);

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const payload = JSON.parse(fetchCall[1].body);

      expect(payload.contents.en).toBe(
        'A new product has been added: This is a very long product title that should be included in the notification'
      );
      expect(payload.headings.en).toBe('New Product Added');
    });

    it('should construct correct deep link URL with product ID', () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      const productWithSpecificId = {
        ...mockProduct,
        _id: 'special-product-id-123',
      };

      notificationService(productWithSpecificId);

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const payload = JSON.parse(fetchCall[1].body);

      expect(payload.url).toBe('ecomapp://products/special-product-id-123');
    });

    it('should include all required OneSignal fields', () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      notificationService(mockProduct);

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const payload = JSON.parse(fetchCall[1].body);

      expect(payload).toHaveProperty('app_id', 'test-app-id');
      expect(payload).toHaveProperty('headings');
      expect(payload).toHaveProperty('contents');
      expect(payload).toHaveProperty('big_picture');
      expect(payload).toHaveProperty('large_icon');
      expect(payload).toHaveProperty('url');
      expect(payload).toHaveProperty('included_segments');
      expect(payload.included_segments).toEqual(['Active Subscriptions']);
    });

    it('should handle special characters in product title', () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });

      const productWithSpecialChars = {
        ...mockProduct,
        title: 'Product with "quotes" & special chars!',
      };

      notificationService(productWithSpecialChars);

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const payload = JSON.parse(fetchCall[1].body);

      expect(payload.contents.en).toBe(
        'A new product has been added: Product with "quotes" & special chars!'
      );
    });
  });
  describe('Integration Tests', () => {
    beforeEach(() => {
      // Ensure config values are set
      (Config as any).ONESIGNAL_API_KEY = 'test-api-key';
      (Config as any).ONESIGNAL_APP_ID = 'test-app-id';
      (Config as any).BASE_URL = 'https://test-base-url.com';
      (Config as any).ONESIGNAL_API_URL = 'https://api.onesignal.com/notifications?c=push';
    });

    it('should complete the full notification flow successfully', async () => {
      const successResponse = {
        id: 'notification-abc123',
        recipients: 250,
        external_id: null,
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(successResponse),
      });

      // Call the service
      notificationService(mockProduct);

      // Verify the fetch was called correctly
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.onesignal.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'test-api-key',
          }),
        })
      );

      // Wait for promises to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify success logging
      expect(consoleSpy.log).toHaveBeenCalledWith(successResponse);
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });

    it('should handle multiple consecutive notification calls', async () => {
      const response1 = {id: 'notification-1', recipients: 100};
      const response2 = {id: 'notification-2', recipients: 200};

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(response1),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(response2),
        });

      const product1 = {...mockProduct, _id: 'product1', title: 'First Product'};
      const product2 = {...mockProduct, _id: 'product2', title: 'Second Product'};

      // Send two notifications
      notificationService(product1);
      notificationService(product2);

      expect(fetch).toHaveBeenCalledTimes(2);

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy.log).toHaveBeenCalledWith(response1);
      expect(consoleSpy.log).toHaveBeenCalledWith(response2);
    });
  });
});
