import {View, Text, Pressable, Image, Dimensions} from 'react-native';
import React, {useMemo, useCallback} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {cartItemCardStyles} from './cartItemCardStyles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import Config from 'react-native-config';

const {width: screenWidth} = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.3;

const CartItemCard = ({
  images,
  title,
  description,
  location,
  price,
  quantity,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}: any) => {
  const {theme} = useTheme();

  const styles = useMemo(() => cartItemCardStyles(theme), [theme]);

  const imageUri = useMemo(() => {
    const imageUrl = images?.[0]?.url;
    return imageUrl?.startsWith('http')
      ? imageUrl
      : `${Config.BASE_URL}${imageUrl || ''}`;
  }, [images]);

  const totalPrice = useMemo(() => {
    return (price * quantity).toFixed(2);
  }, [price, quantity]);

  const translateX = useSharedValue(0);
  const rowHeight = useSharedValue(1);
  const rowOpacity = useSharedValue(1);

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart();
  }, [removeFromCart]);

  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      const shouldDelete = Math.abs(event.translationX) > SWIPE_THRESHOLD;

      if (shouldDelete) {
        translateX.value = withTiming(
          event.translationX > 0 ? screenWidth : -screenWidth,
          {duration: 200},
        );
        rowHeight.value = withTiming(0, {duration: 200});
        rowOpacity.value = withTiming(0, {duration: 200}, () => {
          runOnJS(handleRemoveFromCart)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: rowHeight.value === 0 ? 0 : undefined,
      opacity: rowOpacity.value,
    };
  });

  const deleteBackgroundStyle = useAnimatedStyle(() => {
    const opacity = Math.abs(translateX.value) > SWIPE_THRESHOLD * 0.5 ? 1 : 0;
    const scale = Math.abs(translateX.value) > SWIPE_THRESHOLD * 0.5 ? 1 : 0.8;

    return {
      opacity: withTiming(opacity, {duration: 150}),
      transform: [{scale: withTiming(scale, {duration: 150})}],
    };
  });

  const handleDecreaseQuantity = useCallback(() => {
    decreaseQuantity();
  }, [decreaseQuantity]);

  const handleIncreaseQuantity = useCallback(() => {
    increaseQuantity();
  }, [increaseQuantity]);

  return (
    <Animated.View
      style={[styles.container, containerAnimatedStyle, {borderRadius: 16}]}>
      <View style={styles.deleteBackground}>
        <Animated.View style={[styles.deleteButton, deleteBackgroundStyle]}>
          <Feather name="trash-2" size={24} color="#fff" />
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
          <View style={styles.imageContainer}>
            <Image source={{uri: imageUri}} style={styles.productImage} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.nameText}>{title}</Text>
              <Pressable onPress={handleRemoveFromCart}>
                <Feather name="trash" size={20} color={theme.errorText} />
              </Pressable>
            </View>

            <Text style={styles.descriptionText}>{description}</Text>

            <View style={styles.locationContainer}>
              <View style={styles.locationDot} />
              <Text style={styles.locationText}>{location?.name}</Text>
            </View>

            <View style={styles.footerContainer}>
              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={handleDecreaseQuantity}
                  style={styles.qtyButton}>
                  <Feather name="minus" size={16} color={theme.text} />
                </Pressable>

                <Text style={styles.qtyText}>{quantity}</Text>

                <Pressable
                  onPress={handleIncreaseQuantity}
                  style={styles.qtyButton}>
                  <Feather name="plus" size={16} color={theme.text} />
                </Pressable>
              </View>

              <Text style={styles.totalText}>${totalPrice}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default React.memo(CartItemCard);
