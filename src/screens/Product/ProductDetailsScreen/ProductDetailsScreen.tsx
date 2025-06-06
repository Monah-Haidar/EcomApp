import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
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
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {customHeaderStyles} from '../../../components/molecules/CustomHeader/customHeaderStyles';
import {ImageCarousel} from '../../../components/organisms/ImageCarousel';
import {MapView} from '../../../components/organisms/MapView';
import {useDeleteProduct} from '../../../hooks/useDeleteProduct';
import {useProduct} from '../../../hooks/useProduct';
import {useUserProfile} from '../../../hooks/useUserProfile';
import {ProductStackParamList} from '../../../navigation/types';
import {useAuthStore} from '../../../store/AuthStore';
import {useCartStore} from '../../../store/CartStore';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {global} from '../../../styles/global';
import {productDetailsScreenStyles} from './productDetailsScreenStyles';

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

  const {data: ProductData, isPending, error} = useProduct(productId);
  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteProduct();

  const product = ProductData?.data as ProductDetails;

  const {width} = Dimensions.get('window');

  const styles = useMemo(
    () => productDetailsScreenStyles(theme, width),
    [theme, width],
  );

  const globalStyles = useMemo(() => global(theme), [theme]);
  const backButtonStyles = useMemo(() => customHeaderStyles(theme), [theme]);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return 'Unknown date';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  const handleLongPressImage = useCallback((imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setShowSaveModal(true);
  }, []);

  const handleEmailPress = useCallback(() => {
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
  }, [product?.user?.email, product?.title]);

  const formattedPrice = useMemo(() => {
    return product?.price ? formatPrice(product.price) : '';
  }, [product?.price, formatPrice]);

  const formattedDate = useMemo(() => {
    return product?.createdAt ? formatDate(product.createdAt) : '';
  }, [product?.createdAt, formatDate]);

  const productImages = useMemo(() => {
    return product?.images || [];
  }, [product?.images]);

  const locationData = useMemo(() => {
    return product?.location &&
      product.location.latitude &&
      product.location.longitude
      ? {
          latitude: product.location.latitude,
          longitude: product.location.longitude,
          name: product.location.name,
        }
      : null;
  }, [product?.location]);

  const editIcon = useMemo(
    () => <Feather name="edit" size={20} color={theme.buttonText} />,
    [theme.buttonText],
  );

  const deleteIcon = useMemo(
    () => <Feather name="trash" size={20} color={theme.errorText} />,
    [theme.errorText],
  );

  const emailIcon = useMemo(
    () => <Feather name="mail" size={20} color={theme.buttonText} />,
    [theme.buttonText],
  );

  const shareIcon = useMemo(
    () => <Feather name="share" size={20} color={theme.buttonText} />,
    [theme.buttonText],
  );

  const cartIcon = useMemo(
    () => <Feather name="shopping-cart" size={20} color={theme.buttonText} />,
    [theme.buttonText],
  );

  const shareButtonStyle = useMemo(
    () => [styles.emailButton, {backgroundColor: theme.secondary}],
    [styles.emailButton, theme.secondary],
  );

  const cartButtonStyle = useMemo(
    () => [styles.emailButton],
    [styles.emailButton],
  );

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

  const downloadAndSaveImage = useCallback(
    async (imageUrl: string) => {
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
    },
    [setShowSaveModal],
  );

  const handleSaveImage = useCallback(async () => {
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
  }, [selectedImageUrl, requestStoragePermission, downloadAndSaveImage]);

  const userId = useMemo(
    () => user?.id || userProfileData?.data?.user?.id,
    [user?.id, userProfileData?.data?.user?.id],
  );
  const canEditDelete = useMemo(
    () => product?.user?._id === userId,
    [product?.user?._id, userId],
  );

  const handleProductDelete = useCallback(() => {
    deleteProduct(product?._id);
    setDeleteModal(false);
  }, [deleteProduct, product?._id]);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ProductList');
    }
  }, [navigation]);

  const closeDeleteModal = useCallback(() => setDeleteModal(false), []);
  const openDeleteModal = useCallback(() => setDeleteModal(true), []);
  const closeSaveModal = useCallback(() => setShowSaveModal(false), []);
  const navigateToProductEdit = useCallback(
    () => navigation.navigate('EditProduct', {productId: product?._id}),
    [navigation, productId],
  );

  const shareProduct = useCallback(() => null, []);

  const addProductToCart = useCallback(() => {
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

    addToCart(cartProduct);
  }, [product, addToCart]);

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

  const loadingComponent = useMemo(
    () => (
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
    ),
    [
      globalStyles.container,
      styles.loadingContainer,
      styles.skeletonHeader,
      styles.skeletonImage,
      styles.skeletonTitleRow,
      styles.skeletonTitle,
      styles.skeletonPrice,
      styles.skeletonDescription,
      styles.skeletonText,
      styles.skeletonMap,
    ],
  );

  const errorComponent = useMemo(
    () => (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          An error occurred while fetching product details
        </Text>

        <Pressable
          style={({pressed}) => [
            styles.clearSearchButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={goBack}>
          <Text style={styles.clearSearchButtonText}>Go back</Text>
        </Pressable>
      </View>
    ),
    [
      styles.emptyStateContainer,
      styles.emptyStateText,
      styles.clearSearchButton,
      styles.clearSearchButtonText,
      goBack,
    ],
  );

  if (isPending) {
    return loadingComponent;
  }

  if (error) {
    return errorComponent;
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
            images={productImages}
            onLongPress={handleLongPressImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{formattedPrice}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          {formattedDate && (
            <View style={styles.infoRow}>
              <Feather
                name="calendar"
                size={20}
                color={theme.subheadingText}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Listed on {formattedDate}</Text>
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

          {locationData && (
            <View style={styles.mapSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              <MapView location={locationData} style={styles.map} />
            </View>
          )}

          {product?.user?.email && (
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>Contact the seller</Text>
              <Text style={styles.emailText}>{product?.user?.email}</Text>
              <SubmitButton
                text="Send Email"
                onPress={handleEmailPress}
                icon={emailIcon}
              />
            </View>
          )}

          <View style={styles.buttonRow}>
            <Pressable
              style={({pressed}) => [
                ...shareButtonStyle,
                {opacity: pressed ? 0.8 : 1},
              ]}
              onPress={shareProduct}>
              {shareIcon}
              <Text style={styles.emailButtonText}>Share</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                ...cartButtonStyle,
                {opacity: pressed ? 0.8 : 1},
              ]}
              onPress={addProductToCart}>
              {cartIcon}
              <Text style={styles.emailButtonText}>Add To Cart</Text>
            </Pressable>
          </View>
          
          {canEditDelete && (
            <View>
              <SubmitButton
                text="Edit Product"
                icon={editIcon}
                onPress={navigateToProductEdit}
              />
              <SubmitButton
                text="Delete Product"
                variant="danger"
                icon={deleteIcon}
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

export default React.memo(ProductDetailsScreen);
