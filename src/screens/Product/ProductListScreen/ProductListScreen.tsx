import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import data from '../../../../Products.json';
import { productListStyles } from './styles';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';


const ProductListScreen = () => {
  const {width, height} = useWindowDimensions();
  const {theme } = useTheme();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;
  const styles = productListStyles(theme);

  const itemWidth = width / numColumns - 20;

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={data.data}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={[styles.card, {width: itemWidth}]}>
            <Image source={{uri: item.images[0].url}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductListScreen;

