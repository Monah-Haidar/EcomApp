import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FlatList,
  Pressable,
  useWindowDimensions,
  View
} from 'react-native';
import data from '../../../../Products.json';
import { ProductCard } from '../../../components/molecules/ProductCard';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { productListStyles } from './styles';


type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
    _id: string;
  }>;
};


type RootStackParamList = {
  ProductDetails: {
    product: ProductType;
  };
};

const ProductListScreen = () => {
  const {width, height} = useWindowDimensions();
  const {theme} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;
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
          <Pressable
            onPress={() =>
              navigation.navigate('ProductDetails', {product: item})
            }
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
    </View>
  );
};

export default ProductListScreen;
