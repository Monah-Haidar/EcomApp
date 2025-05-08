import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import data from '../../../../Products.json';
import {productListStyles} from './styles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {ProductCard} from '../../../components/molecules/ProductCard';
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = () => {
  const {width, height} = useWindowDimensions();
  const {theme} = useTheme();
  const navigation = useNavigation();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;
  const styles = productListStyles(theme);

  const itemWidth = width / numColumns - 20;

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data.data}
      numColumns={numColumns}
      key={numColumns}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <Pressable
          onPress={() => navigation.navigate('ProductDetails', {product: item})}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}>
          <ProductCard
            item={item}
            itemWidth={itemWidth}
            source={{uri: item.images[0].url}}
          />
        </Pressable>
      )}
    />
  );
};

export default ProductListScreen;
