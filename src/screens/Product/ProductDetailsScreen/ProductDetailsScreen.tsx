import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FormErrorDisplay} from '../../../components/atoms/FormErrorDisplay';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {CustomHeader} from '../../../components/molecules/CustomHeader';
import {ImageCarousel} from '../../../components/organisms/ImageCarousel';
import {MapView} from '../../../components/organisms/MapView';
import {useDeleteProduct} from '../../../hooks/useDeleteProduct';
import {useProduct} from '../../../hooks/useProduct';
import {useUserProfile} from '../../../hooks/useUserProfile';
import {useAuthStore} from '../../../store/AuthStore';
import {productDetailsScreenStyles} from './productDetailsScreenStyles';
import {ProductStackParamList} from '../../../navigation/types';
import {useCartStore} from '../../../store/CartStore';
import Config from 'react-native-config';
import {customHeaderStyles} from '../../../components/molecules/CustomHeader/customHeaderStyles';
import Entypo from 'react-native-vector-icons/Entypo';

type ProductDetails = {
  location: {
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
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAuthStore(state => state.user);
  const addToCart = useCartStore(state => state.addToCart);
  const {data: userProfileData} = useUserProfile();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);

  const {productId} = route.params as {productId: string};

  // console.log('Product ID:', productId);
  const {data: ProductData, isPending, error} = useProduct(productId);
  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteProduct();

  const product = ProductData?.data as ProductDetails;
  // console.log('Product Details:', product);
  const {width} = Dimensions.get('window');
  const styles = useMemo(
    () => productDetailsScreenStyles(theme, width),
    [theme, width],
  );
  const globalStyles = useMemo(() => global(theme), [theme]);
  const backButtonStyles = useMemo(() => customHeaderStyles(theme), [theme]);

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

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        }
        Alert.alert('Error', 'Email app is not available on this device');
      })
      .catch(error => console.error('Failed to open email:', error));
  };
  const requestStoragePermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const photoPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Photo Library Permission',
              message: 'App needs access to your photo library to save images',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return photoPermission === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to save images',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return storagePermission === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.error('Permission request error:', err);
        return false;
      }
    } else {
      return true;
    }
  }, []);
  const downloadAndSaveImage = async (imageUrl: string) => {
    try {
      setShowSaveModal(false);
      Alert.alert('Downloading', 'Downloading image...');

      const fullImageUrl = `${Config.BASE_URL}${imageUrl}`;

      const fileName = `product_${Date.now()}.jpg`;

      const localFilePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

      const dirExists = await RNFS.exists(RNFS.CachesDirectoryPath);
      if (!dirExists) {
        await RNFS.mkdir(RNFS.CachesDirectoryPath);
      }

      const response = await RNFS.downloadFile({
        fromUrl: fullImageUrl,
        toFile: localFilePath,
        background: false,
      }).promise;

      if (response.statusCode === 200) {
        const fileExists = await RNFS.exists(localFilePath);
        if (fileExists) {
          await CameraRoll.save(`file://${localFilePath}`, {type: 'photo'});
          Alert.alert('Success', 'Image saved to your gallery');
        } else {
          throw new Error('Downloaded file not found');
        }
      } else {
        Alert.alert(
          'Error',
          `Failed to download image: ${response.statusCode}`,
        );
      }
    } catch (error) {
      console.error('Image download error:', error);
      Alert.alert(
        'Error',
        'Failed to save image: ' +
          (typeof error === 'object' && error !== null && 'message' in error
            ? String(error.message)
            : 'Unknown error'),
      );
    }
  };
  const handleSaveImage = async () => {
    setShowSaveModal(false);

    if (!selectedImageUrl) {
      Alert.alert('Error', 'No image selected');
      return;
    }

    try {
      const hasPermission = await requestStoragePermission();
      if (hasPermission) {
        await downloadAndSaveImage(selectedImageUrl);
      } else {
        Alert.alert(
          'Permission Denied',
          'Please grant storage permission to save images',
        );
      }
    } catch (error) {
      console.error('Save image error:', error);
      Alert.alert(
        'Error',
        typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'An unexpected error occurred while saving the image',
      );
    }
  };

  const userId = user?.id || userProfileData?.data?.user?.id;
  const canEditDelete = product?.user?._id === userId;

  const handleProductDelete = () => {
    deleteProduct(product?._id);
    setDeleteModal(false);
  };
  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'ProductList'},
        ],
      }),
    );
  }
}, [navigation]);




  const closeDeleteModal = useCallback(() => setDeleteModal(false), []);
  const openDeleteModal = useCallback(() => setDeleteModal(true), []);
  const closeSaveModal = useCallback(() => setShowSaveModal(false), []);
  const navigateToProductEdit = useCallback(
    () => navigation.navigate('EditProduct', {productId: product?._id}),
    [navigation, productId],
  );

  const shareProduct = () => null;

  const addProductToCart = () => {
    if (!product) return;

    const cartProduct = {
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      images: Array.isArray(product.images)
        ? product.images.map(img => ({
            url: img.url,
            _id: img._id,
          }))
        : [],
      user: product.user && {
        _id: product.user._id || '',
        email: product.user.email || '',
      },
      location: {
        name: product.location.name || 'Unknown Location',
        latitude: product.location.latitude || 0,
        longitude: product.location.longitude || 0,
      },
    };
    // console.log('Adding product to cart:', cartProduct);
    addToCart(cartProduct);
  };

  const viewStyles = useMemo(() => {
    return [
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
    ];
  }, [insets]);

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
    <View style={viewStyles}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <CustomHeader text="Product Details" />
        <Button title="Go Back" onPress={() => navigation.popTo('ProductList')} />
        {deleteError && <FormErrorDisplay error={deleteError?.message} />} */}

        <View style={backButtonStyles.AuthenticatedHeader}>
          <Pressable onPress={goBack}>
            <Entypo name="chevron-with-circle-left" size={32} color="#4F8EF7" />
          </Pressable>
          <Text style={backButtonStyles.AuthenticatedHeaderTitle}>
            Product Details
          </Text>
          <View style={{width: 40}} />
        </View>

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
              ]}
              onPress={shareProduct}>
              <Feather name="share" size={20} color={theme.buttonText} />
              <Text style={styles.emailButtonText}>Share</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.emailButton,
                {opacity: pressed ? 0.8 : 1},
              ]}
              onPress={addProductToCart}>
              <Feather
                name="shopping-cart"
                size={20}
                color={theme.buttonText}
              />
              <Text style={styles.emailButtonText}>Add To Cart</Text>
            </Pressable>
          </View>

          {canEditDelete && (
            <View>
              <SubmitButton
                text="Edit Product"
                icon={
                  <Feather name="edit" size={20} color={theme.buttonText} />
                }
                onPress={navigateToProductEdit}
              />
              <SubmitButton
                text="Delete Product"
                variant="danger"
                icon={
                  <Feather name="trash" size={20} color={theme.errorText} />
                }
                isLoading={isDeleting}
                onPress={openDeleteModal}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDeleteModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Product</Text>
            <Text style={styles.modalText}>
              Do you want to delete this product? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeDeleteModal}>
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

      <Modal
        visible={showSaveModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSaveModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save Image</Text>
            <Text style={styles.modalText}>
              Do you want to save this image to your device?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeSaveModal}>
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
