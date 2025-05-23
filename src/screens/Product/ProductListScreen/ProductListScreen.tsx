import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  Pressable,
  Modal,
  ListRenderItem,
  TextInput,
} from 'react-native';

import {ProductCard} from '../../../components/molecules/ProductCard';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productListScreenStyles} from './productListScreenStyles';
import useProducts from '../../../hooks/useProducts/useProducts';
import AnimatedRefreshControl from '../../../utils/AnimatedRefreshControl';
import {useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSearchProduct} from '../../../hooks/useSearchProduct';

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
    productId: ProductType;
  };
  AddProduct: undefined;
};

const ProductListScreen = () => {
  const {width, height} = useWindowDimensions();
  const {theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [sortBy, setSortBy] = useState<'none' | 'price_asc' | 'price_desc'>(
    'none',
  );
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useProducts();

  const {data: searchData, isPending, error} = useSearchProduct(searchQuery);

  

  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;
  const itemWidth = width / numColumns - 20;

  const styles = productListScreenStyles(theme);
  const displayProducts = useMemo(() => {
    // If user has entered a search query
    if (searchQuery.trim()) {
      // If search is in progress, return empty array to show loading state
      if (isPending) {
        return [];
      }

      // Return search results if available
      if (searchData?.data) {
        const searchResults = searchData.data;

        // Apply the same sorting logic to search results
        if (sortBy === 'price_asc') {
          return [...searchResults].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          return [...searchResults].sort((a, b) => b.price - a.price);
        }

        return searchResults;
      }

      // If search data is undefined or null, return empty array to show empty state
      return [];
    }

    // Otherwise use the paginated product data
    const products = data?.pages.flatMap(page => page.data) || [];

    if (sortBy === 'price_asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data, searchData, searchQuery, sortBy, isPending]);

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
  const renderEmptyState = () => {
    
    if (searchQuery.trim()) {
      
      if (isPending) {
        return (
          <View style={styles.emptyStateContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.emptyStateText}>
              Searching for "{searchQuery}"...
            </Text>
          </View>
        );
      }
      
      if (!searchData?.data || searchData.data.length === 0) {
        return (
          <View style={styles.emptyStateContainer}>
            <Icon name="search-off" size={48} color={theme.text + '80'} />
            <Text style={styles.emptyStateText}>
              No products found matching "{searchQuery}"
            </Text>
            <Text style={styles.emptyStateText}>
              Try searching with different keywords
            </Text>
            <Pressable
              style={({pressed}) => [
                styles.clearSearchButton,
                {opacity: pressed ? 0.8 : 1},
              ]}
              onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearchButtonText}>Clear Search</Text>
            </Pressable>
          </View>
        );
      }
    } else {
      // For non-search empty state (normal product list is empty)
      if (
        !data?.pages ||
        data.pages.length === 0 ||
        data.pages[0].data.length === 0
      ) {
        return (
          <View style={styles.emptyStateContainer}>
            <Icon name="inventory-2" size={48} color={theme.text + '80'} />
            <Text style={styles.emptyStateText}>No products available</Text>
          </View>
        );
      }
    }

    return null;
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
        <Text style={styles.emptyStateText}>Failed to load products</Text>
        <Pressable
          style={({pressed}) => [
            styles.retryButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const handleRefresh = () => refetch();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderItem: ListRenderItem<ProductType> = ({item, index}) => (
    <ProductCard
      item={item}
      itemWidth={itemWidth}
      source={{
        uri: `https://backend-practice.eurisko.me${item.images[0]?.url}`,
      }}
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item._id})
      }
      onSwipeAction={() => console.log('Bookmarked:', item._id)}
      animationDelay={index * 50}
    />
  );

  const renderSortButton = () => (
    <Pressable
      style={({pressed}) => [styles.sortButton, {opacity: pressed ? 0.8 : 1}]}
      onPress={() => setShowSortModal(true)}>
      <Icon name="sort" size={24} color={theme.text} />
      <Text style={styles.sortButtonText}>Sort</Text>
    </Pressable>
  );

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSortModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sort by Price</Text>

          <Pressable
            style={({pressed}) => [
              styles.sortOption,
              sortBy === 'none' && styles.selectedOption,
              {opacity: pressed ? 0.8 : 1},
            ]}
            onPress={() => {
              setSortBy('none');
              setShowSortModal(false);
            }}>
            <Text
              style={[
                styles.sortOptionText,
                sortBy === 'none' && styles.selectedOptionText,
              ]}>
              Default
            </Text>
          </Pressable>

          <Pressable
            style={({pressed}) => [
              styles.sortOption,
              sortBy === 'price_asc' && styles.selectedOption,
              {opacity: pressed ? 0.8 : 1},
            ]}
            onPress={() => {
              setSortBy('price_asc');
              setShowSortModal(false);
            }}>
            <Text
              style={[
                styles.sortOptionText,
                sortBy === 'price_asc' && styles.selectedOptionText,
              ]}>
              Price: Low to High
            </Text>
          </Pressable>

          <Pressable
            style={({pressed}) => [
              styles.sortOption,
              sortBy === 'price_desc' && styles.selectedOption,
              {opacity: pressed ? 0.8 : 1},
            ]}
            onPress={() => {
              setSortBy('price_desc');
              setShowSortModal(false);
            }}>
            <Text
              style={[
                styles.sortOptionText,
                sortBy === 'price_desc' && styles.selectedOptionText,
              ]}>
              Price: High to Low
            </Text>
          </Pressable>

          <Pressable
            style={({pressed}) => [
              styles.cancelButton,
              {opacity: pressed ? 0.8 : 1},
            ]}
            onPress={() => setShowSortModal(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={24} color={theme.text + '80'} />
          <TextInput
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            placeholder="Search Products..."
            placeholderTextColor={theme.text + '80'}
            autoCapitalize="none"
          />
          
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}>
              <Icon name="close" size={24} color={theme.text} />
            </Pressable>
          )}
        </View>
        <View>{renderSortButton()}</View>
      </View>
      
      <FlatList
        contentContainerStyle={[
          styles.container,
          
          (!displayProducts || displayProducts.length === 0) && {flex: 1},
        ]}
        data={displayProducts}
        numColumns={numColumns}
        key={numColumns.toString()}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={10}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
            progressBackgroundColor={theme.cardBackground}
          />
        }
      />
      
      {renderSortModal()}

      <Pressable
        style={({pressed}) => [
          styles.floatingActionButton,
          {opacity: pressed ? 0.8 : 1},
        ]}
        onPress={() => navigation.navigate('AddProduct')}>
        <Icon name="add" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default ProductListScreen;
