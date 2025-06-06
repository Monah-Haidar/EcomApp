import React, { useCallback, useMemo } from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { productCardStyles } from './productCardStyles';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { shareProduct } from '../../../utils/shareProduct';

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  description?: string;
  images: Array<{
    url: string;
    _id: string;
  }>;

  location?: {
    name: string;
  };
}

interface ProductCardProps {
  source: ImageSourcePropType;
  item: ProductItem;
  itemWidth: number;
  onPress: () => void;
  onSwipeAction?: () => void;
  animationDelay?: number;
}

const ProductCard = ({
  source,
  item,
  itemWidth,
  onPress,
  onSwipeAction,
  animationDelay = 0,
}: ProductCardProps) => {
  const {theme} = useTheme();

  const styles = useMemo(() => productCardStyles(theme), [theme]);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }, []);
  const handleShare = useCallback(async (e: any) => {
    e.stopPropagation(); // Prevent card press when share button is pressed
    try {
      // Convert ProductItem to ProductShareData format
      const shareData = {
        ...item,
        description: item.description || '', // Provide default empty string if undefined
      };
      await shareProduct(shareData);
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  }, [item]);

  const renderImage = useMemo(() => {
    if (item.images && item.images.length > 0) {
      return <Animated.Image sharedTransitionTag="sharedTag" source={source} style={styles.image} resizeMode="cover" />;
    }

    return (
      <View style={styles.placeholderImage}>
        <Feather name="image" size={40} color={theme.subheadingText} />
      </View>
    );
  }, [
    item.images,
    source,
    styles.image,
    styles.placeholderImage,
    theme.subheadingText,
  ]);

  const renderLocation = useMemo(() => {
    if (!item.location) return null;
    return (
      <View style={styles.locationContainer}>
        <Feather
          name="map-pin"
          size={14}
          color={theme.subheadingText}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText} numberOfLines={1}>
          {item.location.name || 'Online'}
        </Text>
      </View>
    );
  }, [item.location, styles, theme.subheadingText]);
  return (
    <View
      style={[
        styles.container,
        {
          width: itemWidth,
        },
      ]}>
      <Pressable
        style={({pressed}) => [styles.card, {opacity: pressed ? 0.9 : 1}]}
        onPress={onPress}>
        <View style={styles.imageContainer}>{renderImage}</View>

        <View style={styles.content}>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>

          {renderLocation}
          
          <View style={styles.actionContainer}>
            <Pressable
              style={({pressed}) => [
                styles.shareButton,
                {opacity: pressed ? 0.7 : 1}
              ]}
              onPress={handleShare}>
              <Feather name="share-2" size={16} color={theme.primary} />
              <Text style={styles.shareButtonText}>Share</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default React.memo(ProductCard);
