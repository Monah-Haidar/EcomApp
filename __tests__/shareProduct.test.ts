import {Platform} from 'react-native';
import {shareProduct, shareProductById} from '../src/utils/shareProduct';

// Mock react-native modules
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  Share: {
    share: jest.fn(),
    sharedAction: 'sharedAction',
    dismissedAction: 'dismissedAction',
  },
  Alert: {
    alert: jest.fn(),
  },
}));

const mockProduct = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product description',
  images: [{url: 'https://example.com/image.jpg', _id: 'img1'}],
};

describe('shareProduct utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('shareProduct function', () => {    it('should create correct deep link without web link', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProduct(mockProduct);

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('ecomapp://products/507f1f77bcf86cd799439011'),
          title: 'Test Product - $29.99',
          url: 'ecomapp://products/507f1f77bcf86cd799439011',
        }),
        {dialogTitle: 'Share Product'}
      );
    });

    it('should format price correctly', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      const productWithHighPrice = {...mockProduct, price: 1234.56};
      await shareProduct(productWithHighPrice);

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Product - $1,234.56',
        }),
        expect.any(Object)
      );
    });    it('should handle iOS platform correctly', async () => {
      const {Share} = require('react-native');
      Platform.OS = 'ios';
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProduct(mockProduct);

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'ecomapp://products/507f1f77bcf86cd799439011',
        }),
        expect.any(Object)
      );
    });

    it('should handle Android platform correctly', async () => {
      const {Share} = require('react-native');
      Platform.OS = 'android';
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProduct(mockProduct);

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'ecomapp://products/507f1f77bcf86cd799439011',
        }),
        expect.any(Object)
      );
    });

    it('should return success when shared', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      const result = await shareProduct(mockProduct);

      expect(result).toEqual({success: true, action: 'shared'});
    });

    it('should return failure when dismissed', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.dismissedAction});

      const result = await shareProduct(mockProduct);

      expect(result).toEqual({success: false, action: 'dismissed'});
    });

    it('should handle custom message', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProduct(mockProduct, {customMessage: 'Custom message here'});

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Custom message here'),
        }),
        expect.any(Object)
      );
    });

    it('should handle share errors', async () => {
      const {Share, Alert} = require('react-native');
      const error = new Error('Share failed');
      Share.share.mockRejectedValue(error);

      const result = await shareProduct(mockProduct);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Share Error',
        'Unable to share this product. Please try again.',
        [{text: 'OK', style: 'default'}]
      );
      expect(result).toEqual({success: false, action: 'error', error});
    });
  });

  describe('shareProductById function', () => {    it('should create correct share content with minimal data', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProductById('507f1f77bcf86cd799439011', 'Test Product', 29.99);
      
      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('ecomapp://products/507f1f77bcf86cd799439011'),
          title: 'Test Product - $29.99',
          url: 'ecomapp://products/507f1f77bcf86cd799439011',
        }),
        {dialogTitle: 'Share Product'}
      );
    });

    it('should handle custom message in shareProductById', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      await shareProductById(
        '507f1f77bcf86cd799439011',
        'Test Product',
        29.99,
        'Check out this awesome deal!'
      );

      expect(Share.share).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Check out this awesome deal!'),
        }),
        expect.any(Object)
      );
    });

    it('should return true when shared successfully', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.sharedAction});

      const result = await shareProductById('507f1f77bcf86cd799439011', 'Test Product', 29.99);

      expect(result).toBe(true);
    });

    it('should return false when dismissed', async () => {
      const {Share} = require('react-native');
      Share.share.mockResolvedValue({action: Share.dismissedAction});

      const result = await shareProductById('507f1f77bcf86cd799439011', 'Test Product', 29.99);

      expect(result).toBe(false);
    });

    it('should handle errors in shareProductById', async () => {
      const {Share, Alert} = require('react-native');
      Share.share.mockRejectedValue(new Error('Share failed'));

      const result = await shareProductById('507f1f77bcf86cd799439011', 'Test Product', 29.99);

      expect(Alert.alert).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
