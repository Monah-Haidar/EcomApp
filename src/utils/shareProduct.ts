import {Alert, Platform, Share} from 'react-native';

interface ProductShareData {
  _id: string;
  title: string;
  price: number;
  description: string;
  images?: Array<{url: string; _id: string}>;
}

interface ShareProductOptions {
  includeImage?: boolean;
  customMessage?: string;
}



// Enhanced share content with deep link only (no web links)
const createEnhancedShareContent = (
  message: string,
  title: string,
  deepLink: string
) => {
  const baseContent = {
    message,
    title,
  };

  // Use deep link as the primary URL for both platforms
  return {
    ...baseContent,
    url: deepLink,
  };
};

export const shareProduct = async (
  product: ProductShareData,
  options: ShareProductOptions = {},
) => {
  try {
    const formattedPrice = `$${product.price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

    const deepLink = `ecomapp://products/${product._id}`;    // Create the share message with properly formatted deep link (no web link)
    const customMessage = options.customMessage || product.description;
    
    const shareMessage = `Check out this amazing product: ${product.title}\n\nPrice: ${formattedPrice}\n\n${customMessage}\n\n📱 Open in app:\n${deepLink}`;

    const shareContent = createEnhancedShareContent(
      shareMessage,
      `${product.title} - ${formattedPrice}`,
      deepLink
    );

    const result = await Share.share(shareContent, {
      dialogTitle: 'Share Product',
    });

    if (result.action === Share.sharedAction) {
      console.log('✅ Product shared successfully');
      
      if (Platform.OS === 'android' && result.activityType) {
        console.log('📱 Shared via:', result.activityType);
      }
      
      return {success: true, action: 'shared'};
    } else if (result.action === Share.dismissedAction) {
      console.log('❌ Share dialog dismissed');
      return {success: false, action: 'dismissed'};
    }

    return {success: false, action: 'unknown'};
  } catch (error) {
    console.error('❌ Error sharing product:', error);
    
    Alert.alert(
      'Share Error',
      'Unable to share this product. Please try again.',
      [{text: 'OK', style: 'default'}],
    );
    
    return {success: false, action: 'error', error};
  }
};

// Alternative share function with just product ID and basic info for lighter use cases
export const shareProductById = async (
  productId: string,
  title: string,
  price: number,
  customMessage?: string,
) => {
  try {
    const formattedPrice = `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;    const deepLink = `ecomapp://products/${productId}`;

    const shareMessage = customMessage 
      ? `${customMessage}\n\n📱 Open in app:\n${deepLink}`
      : `Check out this product: ${title} - ${formattedPrice}\n\n📱 Open in app:\n${deepLink}`;

    const shareContent = createEnhancedShareContent(
      shareMessage,
      `${title} - ${formattedPrice}`,
      deepLink
    );

    const result = await Share.share(shareContent, {
      dialogTitle: 'Share Product',
    });

    return result.action === Share.sharedAction;
  } catch (error) {
    console.error('❌ Error sharing product:', error);
    Alert.alert(
      'Share Error',
      'Unable to share this product. Please try again.',
    );
    return false;
  }
};
