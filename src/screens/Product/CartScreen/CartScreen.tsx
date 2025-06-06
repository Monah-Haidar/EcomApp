import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { CartItemCard } from '../../../components/organisms/CartItem';
import { spacing } from '../../../constants/spacing';
import useCartStore, { CartItem } from '../../../store/CartStore/CartStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { cartScreenStyles } from './cartScreenStyles';

const CartScreen = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const cartItems = useCartStore(state => state.cartItems);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalQuantity = useCartStore(state => state.totalQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const clearCart = useCartStore(state => state.clearCart);

  const styles = useMemo(() => cartScreenStyles(theme), [theme]);


  const viewStyles = useMemo(() => {
    return [
      {
        marginTop: insets.top,
        marginLeft: insets.left,
        marginRight: insets.right,
        backgroundColor: theme.background,
      },
    ];
  }, [insets]);

  return (
    <ScrollView
      style={viewStyles}
      contentContainerStyle={{paddingBottom: spacing.xl_plus}}>
      <CustomHeader text="Cart" />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <View style={{paddingHorizontal: spacing.md_plus}}>
          <View>
            {cartItems.map((item: CartItem) => (
              <CartItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                images={item.images}
                quantity={item.quantity}
                location={item.location}
                removeFromCart={() => removeFromCart(item._id)}
                decreaseQuantity={() => updateQuantity(item._id, -1)}
                increaseQuantity={() => updateQuantity(item._id, +1)}
              />
            ))}
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({totalQuantity})</Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            <View
              style={[
                styles.summaryRow,
                {
                  marginTop: spacing.sm,
                  paddingTop: spacing.sm,
                  borderTopWidth: 1,
                  borderTopColor: theme.border,
                },
              ]}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
          <SubmitButton
            text="Clear Cart"
            variant="danger"
            onPress={clearCart}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;
