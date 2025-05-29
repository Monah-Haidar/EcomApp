import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import {useCallback, useMemo, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProductCard} from '../../../components/molecules/ProductCard';
import {spacing} from '../../../constants/spacing';
import useProducts from '../../../hooks/useProducts/useProducts';
import {useSearchProduct} from '../../../hooks/useSearchProduct';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {productListScreenStyles} from './productListScreenStyles';
import {ProductStackParamList} from '../../../navigation/types';


type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
    _id: string;  }>;
};

const ProductListScreen = () => {
  const {width, height} = useWindowDimensions();
  const {theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

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

  const {numColumns, itemWidth} = useMemo(() => {
    const isLandscape = width > height;
    const numColumns = isLandscape ? 2 : 1;
    const itemWidth = width / numColumns - 20;
    return {numColumns, itemWidth};
  }, [width, height]);

  const styles = useMemo(() => productListScreenStyles(theme), [theme]);

  const displayProducts = useMemo(() => {
    if (searchQuery.trim()) {
      if (isPending) {
        return [];
      }

      if (searchData?.data) {
        const searchResults = searchData.data;

        if (sortBy === 'price_asc') {
          return [...searchResults].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          return [...searchResults].sort((a, b) => b.price - a.price);
        }

        return searchResults;
      }

      return [];
    }

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

  const renderSkeleton = useMemo(
    () => (
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginTop: 12,
          height: '100%',
        }}>
        <SkeletonPlaceholder
          borderRadius={4}
          backgroundColor={theme.cardBackground}
          shimmerWidth={width}>
          {[...Array(3)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="column"
              marginTop={20}>
              <SkeletonPlaceholder.Item
                height={165}
                borderRadius={spacing.radius_md}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                height={20}
                borderRadius={spacing.radius_md}
              />
              <SkeletonPlaceholder.Item
                width={itemWidth * 0.3}
                height={20}
                marginTop={10}
                borderRadius={spacing.radius_md}
              />
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder>
      </ScrollView>
    ),
    [theme.cardBackground, width, itemWidth],
  );

  const handleRefresh = () => refetch();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderItem: ListRenderItem<ProductType> = useCallback(
    ({item, index}) => (
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
    ),
    [itemWidth, navigation],
  );

  const renderSortButton = useCallback(
    () => (
      <Pressable
        style={({pressed}) => [styles.sortButton, {opacity: pressed ? 0.8 : 1}]}
        onPress={() => setShowSortModal(true)}>
        <Icon name="sort" size={24} color={theme.text} />
        <Text style={styles.sortButtonText}>Sort</Text>
      </Pressable>
    ),
    [theme.text, styles.sortButtonText, styles.sortButton],
  );

  const renderSortModal = useCallback(
    () => (
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
    ),
    [showSortModal, styles, sortBy],
  );

  const navigateAddProduct = useCallback(
    () => navigation.navigate('AddProduct'),
    [navigation],
  );

  if (status === 'pending') {
    return renderSkeleton;
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
              onPress={handleClearSearch}
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
        onPress={navigateAddProduct}>
        <Icon name="add" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default ProductListScreen;
