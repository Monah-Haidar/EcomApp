// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {FlatList, Pressable, useWindowDimensions, View} from 'react-native';

// import {ProductCard} from '../../../components/molecules/ProductCard';
// import {useTheme} from '../../../store/ThemeStore/ThemeStore';
// import {productListStyles} from './styles';
// import { useProducts } from '../../../hooks/useProducts';

// type ProductType = {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   images: Array<{
//     url: string;
//     _id: string;
//   }>;
// };

// type RootStackParamList = {
//   ProductDetails: {
//     product: ProductType;
//   };
// };

// const ProductListScreen = () => {
//   const {width, height} = useWindowDimensions();
//   const {theme} = useTheme();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useProducts();

//   const isLandscape = width > height;
//   const numColumns = isLandscape ? 3 : 1;
//   const styles = productListStyles(theme);
//   const itemWidth = width / numColumns - 20;

//   if (status === 'pending') return

//   return (
//     <View>
//       <FlatList
//         contentContainerStyle={styles.container}
//         // data={data.data}
//         numColumns={numColumns}
//         key={numColumns}
//         keyExtractor={item => item._id}
//         // renderItem={({item}) => (
//         //   <Pressable
//         //     onPress={() =>
//         //       navigation.navigate('ProductDetails', {product: item})
//         //     }
//         //     style={({pressed}) => [
//         //       {
//         //         opacity: pressed ? 0.6 : 1,
//         //       },
//         //     ]}>
//         //     <ProductCard
//         //       item={item}
//         //       itemWidth={itemWidth}
//         //       source={{uri: item.images[0].url}}
//         //     />
//         //   </Pressable>
//         // )}
//         renderItem={({item, index}) => (
//           <ProductCard
//             item={item}
//             itemWidth={itemWidth}
//             source={{uri: item.images[0]?.url}}
//             onPress={() =>
//               navigation.navigate('ProductDetails', {product: item})
//             }
//             onSwipeAction={() => console.log('Bookmarked:', item._id)}
//             animationDelay={index * 100}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default ProductListScreen;

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';

import {ProductCard} from '../../../components/molecules/ProductCard';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productListStyles} from './styles';
import useProducts from '../../../hooks/useProducts/useProducts';
import AnimatedRefreshControl from '../../../utils/AnimatedRefreshControl';

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useProducts();

  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;
  const itemWidth = width / numColumns - 20;

  const styles = productListStyles(theme);

  const allProducts = data?.pages.flatMap(page => page.data) || [];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.primary} />
      </View>
    );
  };

  if (status === 'pending') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load products</Text>
      </View>
    );
  }

  const handleRefresh = () => refetch();

  const renderItem = ({item, index}) => (
    <ProductCard
      item={item}
      itemWidth={itemWidth}
      source={{
        uri: `https://backend-practice.eurisko.me${item.images[0]?.url}`,
      }}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
      onSwipeAction={() => console.log('Bookmarked:', item._id)}
      animationDelay={index * 50}
    />
  );

  return (
    <View style={styles.mainContainer}>
    <FlatList
        contentContainerStyle={styles.container}
        data={allProducts}
        numColumns={numColumns}
        key={numColumns.toString()}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={10}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
            progressBackgroundColor={theme.card}
          />
        }
      />
  </View>
  );
};

export default ProductListScreen;
