import {Image, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productListStyles} from '../../../screens/Product/ProductListScreen/styles';

const ProductCard = ({
  source,
  item,
  itemWidth,
}: {
  source: any;
  item: any;
  itemWidth: number;
}) => {
  const {theme} = useTheme();
  const styles = productListStyles(theme);
  return (
    <View style={[styles.card, {width: itemWidth}]}>
      <Image source={source} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      {/* <Text style={styles.description}>{item.description}</Text> */}
    </View>
  );
};

export default ProductCard;
