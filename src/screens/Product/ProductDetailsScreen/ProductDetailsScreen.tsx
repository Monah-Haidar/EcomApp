// import {useRoute} from '@react-navigation/native';
// import {Image, Pressable, Text, View} from 'react-native';

// type ProductDetailsParams = {
//   product: {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     images: [
//       {
//         url: string;
//       },
//     ];
//   };
// };

// const ProductDetailsScreen = () => {
//   const route = useRoute();

//   const {product} = route.params as ProductDetailsParams;

//   return (
//     <View>
//       <Image
//         source={{uri: product.images[0].url}}
//         style={{
//           width: '100%',
//           height: 160,
//           borderRadius: 8,
//           marginBottom: 10,
//         }}
//       />
//       <Text>{product.title}</Text>
//       <Text>{product.description}</Text>
//       <Text>{product.price}</Text>

//       <View>
//         <Pressable>Share</Pressable>
//         <Pressable>Add to Cart</Pressable>
//       </View>
//     </View>
//   );
// };

// export default ProductDetailsScreen;
import {useRoute} from '@react-navigation/native';
import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {productDetailsStyles} from './styles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';

type ProductDetailsParams = {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: [
      {
        url: string;
      },
    ];
  };
};

const ProductDetailsScreen = () => {
  const route = useRoute();
  const {theme} = useTheme();
  const {product} = route.params as ProductDetailsParams;
  const {width} = Dimensions.get('window');
  const styles = productDetailsStyles(width, theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: product.images[0].url}}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.addButton]}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
