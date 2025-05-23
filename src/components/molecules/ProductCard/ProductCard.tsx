import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { spacing } from '../../../constants/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { normalizeFont } from '../../../utils/normalizeFont';
import Feather from 'react-native-vector-icons/Feather';

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
  const { theme } = useTheme();
  const styles = productCardStyles(theme);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  
  // Animation values
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  
  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };
  
  // Handle pan gestures for swipe
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
    })
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
          transform: [
            { translateX },
            { scale }
          ]
        }
      ]}
      {...panResponder.panHandlers}
    >
      {/* Main Card */}
      <Pressable 
        style={({ pressed }) => [
          styles.card,
          { opacity: pressed ? 0.9 : 1 }
        ]}
        onPress={onPress}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          {item.images && item.images.length > 0 ? (
            <Image
              source={source}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="image" size={40} color={theme.subheadingText} />
            </View>
          )}
        </View>
        
        
        <View style={styles.content}>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
          
          
          {item.location && (
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={14} color={theme.subheadingText} style={styles.locationIcon} />
              <Text style={styles.locationText} numberOfLines={1}>
                {item.location.name || 'Online'}
              </Text>
            </View>
          )}
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

const productCardStyles = (theme: any) => StyleSheet.create({
  container: {
    marginBottom: spacing.md_plus,
    marginHorizontal: spacing.xs,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: spacing.radius_md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: spacing.xxs },
    shadowOpacity: 0.1,
    shadowRadius: spacing.xs,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 160,
    backgroundColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontFamily: FONT_FAMILY.POPPINS_SEMI_BOLD,
    fontSize: normalizeFont(FONT_SIZE.MD),
    color: theme.text,
    marginRight: spacing.sm,
  },
  price: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: normalizeFont(FONT_SIZE.MD),
    color: theme.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  locationIcon: {
    marginRight: spacing.xs,
  },
  locationText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.subheadingText,
    flex: 1,
  },
  swipeAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 80,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 80 }],
  },
});

export default ProductCard;