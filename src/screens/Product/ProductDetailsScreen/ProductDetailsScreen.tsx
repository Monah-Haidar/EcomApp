import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {spacing} from '../../../constants/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../constants/font';
import {normalizeFont} from '../../../utils/normalizeFont';
import {global} from '../../../styles/global';
import Feather from 'react-native-vector-icons/Feather';
// import ImageCarousel from './imageCarousel';
// import MapView from './mapView';
import {useProduct} from '../../../hooks/useProduct';
import {CustomHeader} from '../../../components/molecules/CustomHeader';
import {ImageCarousel} from '../../../components/organisms/ImageCarousel';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {MapView} from '../../../components/organisms/MapView';
import {productDetailsScreenStyles} from './productDetailsScreenStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthStore} from '../../../store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../api/config';
import { useDeleteProduct } from '../../../hooks/useDeleteProduct';
// import { ImageCarousel } from '../../../components/molecules/ImageCarousel';
// import { BackButton } from '../../../components/atoms/BackButton';
// import { MapView } from '../../../components/molecules/MapView';

// Define expected route params
type ProductDetails = {
  location?: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
  _id: string;
  title: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
    _id: string;
  }>;
  user: {
    _id: string;
    email: string;
  };
  createdAt?: string;
};

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAuthStore(state => state.user);

  // const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);

  const {productId} = route.params;

  const {data: ProductData, isPending, error} = useProduct(productId);
  const {mutate: deleteProduct, isPending: isDeleting} = useDeleteProduct();

  // console.log(productId);

  const product = ProductData?.data as ProductDetails;

  // console.log(product);
  const {width} = Dimensions.get('window');
  const styles = productDetailsScreenStyles(theme, width);
  const globalStyles = global(theme);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLongPressImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setShowSaveModal(true);
  };

  const handleEmailPress = () => {
    if (!product?.user?.email) return;

    const subject = `Regarding your listing: ${product.title}`;
    const url = `mailto:${product?.user?.email}?subject=${encodeURIComponent(
      subject,
    )}`;

    // console.log('Email URL:', url);

    Linking.canOpenURL(url)
      .then(supported => {
        // console.log('Supported:', supported);
        if (supported) {
          return Linking.openURL(url);
        }
        Alert.alert('Error', 'Email app is not available on this device');
      })
      .catch(error => console.error('Failed to open email:', error));
  };

  const handleSaveImage = () => {
    // In a real implementation, this would use react-native-fs or similar
    // to download and save the image to the device
    Alert.alert('Success', 'Image saved to your gallery');
    setShowSaveModal(false);
  };

  const canEditDelete = product?.user?._id === user?.id; // Replace with actual user ID check

  

  const handleProductDelete = () => {
    deleteProduct(product?.user?._id);
    setDeleteModal(false);
  };

  if (isPending) {
    return (
      <View style={[globalStyles.container, styles.loadingContainer]}>
        <View style={styles.skeletonHeader} />
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonTitleRow}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonPrice} />
        </View>
        <View style={styles.skeletonDescription} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonMap} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          An error occurred while fetching product details
        </Text>

        <Pressable
          style={({pressed}) => [
            styles.clearSearchButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.clearSearchButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color={theme.primary} />
            <Text style={styles.backButtonText}>Back to products</Text>
          </Pressable>
        </View> */}

        <CustomHeader text="Product Details" />

        <View style={styles.carouselContainer}>
          <ImageCarousel
            images={product?.images || []}
            onLongPress={imageUrl => handleLongPressImage(imageUrl)}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {product.createdAt && (
            <View style={styles.infoRow}>
              <Feather
                name="calendar"
                size={20}
                color={theme.subheadingText}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                Listed on {formatDate(product.createdAt)}
              </Text>
            </View>
          )}

          {product.location && (
            <View style={styles.infoRow}>
              <Feather
                name="map-pin"
                size={20}
                color={theme.subheadingText}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{product.location.name}</Text>
            </View>
          )}

          {/* Map Section */}
          {product.location &&
            product.location.latitude &&
            product.location.longitude && (
              <View style={styles.mapSection}>
                <Text style={styles.sectionTitle}>Location</Text>
                <MapView
                  location={{
                    latitude: product.location.latitude,
                    longitude: product.location.longitude,
                    name: product.location.name,
                  }}
                  style={styles.map}
                />
              </View>
            )}

          {product?.user?.email && (
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>Contact the seller</Text>
              <Text style={styles.emailText}>{product?.user?.email}</Text>

              <SubmitButton
                text="Send Email"
                onPress={handleEmailPress}
                icon={
                  <Feather name="mail" size={20} color={theme.buttonText} />
                }
              />
            </View>
          )}

          <View style={styles.buttonRow}>
            <Pressable
              style={({pressed}) => [
                styles.emailButton,
                {opacity: pressed ? 0.8 : 1, backgroundColor: theme.secondary},
              ]}>
              <Feather name="share" size={20} color={theme.buttonText} />
              <Text style={styles.emailButtonText}>Share</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.emailButton,
                {opacity: pressed ? 0.8 : 1},
              ]}>
              <Feather
                name="shopping-cart"
                size={20}
                color={theme.buttonText}
              />
              <Text style={styles.emailButtonText}>Add To Card</Text>
            </Pressable>
          </View>

          {true && (
            <View>
              <SubmitButton
                text="Edit Product"
                icon={
                  <Feather name="edit" size={20} color={theme.buttonText} />
                }
                onPress={() =>
                  navigation.navigate('EditProduct', {productId: product._id})
                }
              />
              <SubmitButton
                text="Delete Product"
                variant="danger"
                icon={
                  <Feather name="trash" size={20} color={theme.errorText} />
                }
                onPress={() => setDeleteModal(true)}
              />
            </View>
          )}
        </View>
      </ScrollView>


      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Product</Text>
            <Text style={styles.modalText}>
              Do you want to delete this product? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setDeleteModal(false)}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleProductDelete}>
                <Text style={styles.modalSaveButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Save Image Modal */}
      <Modal
        visible={showSaveModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save Image</Text>
            <Text style={styles.modalText}>
              Do you want to save this image to your device?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowSaveModal(false)}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveImage}>
                <Text style={styles.modalSaveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetailsScreen;
