import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productCardStyles} from './productCardStyles';

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  description?: string;
  images: Array<{
    url: string;
    _id: string;
  }>;
  // Add location if available in your data structure
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

  const [isSwipingLeft, setIsSwipingLeft] = useState(false);

  const styles = useMemo(() => productCardStyles(theme), [theme]);

  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const renderImage = useMemo(() => {
    if (item.images && item.images.length > 0) {
      return <Image source={source} style={styles.image} resizeMode="cover" />;
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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderGrant: () => {
        setIsSwipingLeft(false);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < -10) {
          setIsSwipingLeft(true);
          // Limit swipe to -80px
          translateX.setValue(Math.max(gestureState.dx, -80));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isSwipingLeft && gestureState.dx < -40) {
          // Complete swipe action
          Animated.spring(translateX, {
            toValue: -80,
            useNativeDriver: true,
          }).start();

          // Call swipe action handler
          onSwipeAction && onSwipeAction();
        } else {
          // Return to initial position
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Entrance animation
  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(animationDelay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: itemWidth,
          opacity,
          transform: [{translateX}, {scale}],
        },
      ]}
      {...panResponder.panHandlers}>
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
        </View>
      </Pressable>

      {/* Swipe Action Indicator */}
      {/* <Animated.View
        style={[
          styles.swipeAction,
          {
            transform: [{
              translateX: translateX.interpolate({
                inputRange: [-80, 0],
                outputRange: [0, 80],
              }),
            }],
          }
        ]}
      >
        <Feather name="bookmark" size={24} color="white" />
      </Animated.View> */}
    </Animated.View>
  );
};

export default React.memo(ProductCard);
