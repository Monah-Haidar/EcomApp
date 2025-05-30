import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {cartItemCardStyles} from './cartItemCardStyles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';

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
  const styles = cartItemCardStyles(theme);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: images?.[0]?.url?.startsWith('http')
              ? images[0].url
              : `https://backend-practice.eurisko.me${images?.[0]?.url || ''}`,
          }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{title}</Text>
          <Pressable onPress={removeFromCart}>
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
            <Pressable onPress={decreaseQuantity} style={styles.qtyButton}>
              <Feather name="minus" size={16} color={theme.text} />
            </Pressable>

            <Text style={styles.qtyText}>{quantity}</Text>

            <Pressable onPress={increaseQuantity} style={styles.qtyButton}>
              <Feather name="plus" size={16} color={theme.text} />
            </Pressable>
          </View>

          <Text style={styles.totalText}>
            ${(price * quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default CartItemCard;
