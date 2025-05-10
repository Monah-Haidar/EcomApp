import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productListStyles} from '../../../screens/Product/ProductListScreen/styles';


interface ProductItem {
  title: string;
  price: number;
  description?: string;
}

interface ProductCardProps {
  source: ImageSourcePropType;
  item: ProductItem;
  itemWidth: number;
}


const ProductCard = ({
  source,
  item,
  itemWidth,
}: ProductCardProps) => {
  const {theme} = useTheme();
  const styles = productListStyles(theme);
  return (
    <View style={[styles.card, {width: itemWidth}]}>
      <Image source={source} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );
};

export default ProductCard;
