import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';
import FormInputContainer from '../../../components/molecules/FormInputContainer/FormInputContainer';
import { ProductImagePicker } from '../../../components/molecules/ProductImagePicker';
import LocationPicker from '../../../components/molecules/LocationPicker/LocationPicker';
import { useEditProduct } from '../../../hooks/useEditProduct';
import { useProduct } from '../../../hooks/useProduct';
import { ProductFormData, ProductSchema } from '../../../schemas/ProductSchema';
import { global } from '../../../styles/global';
import { editProductScreenStyles } from './editProductScreenStyles';

const EditProductScreen = ({route}: {route: any}) => {
  const {productId} = route.params;
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data,
    isPending: pendingProduct,
    error: productError,
  } = useProduct(productId);
  const {mutate, isPending: pendingEdit, error: editError} = useEditProduct();

  const product = data?.data;
  const [imageError, setImageError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Array<{uri: string; type: string; name: string}>>([]);
  const [location, setLocation] = useState<{name: string, longitude: number, latitude: number} | null>(null);
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
    },
  });

  
  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
      });

      
      if (product.images && product.images.length > 0) {
        const formattedImages = product.images.map(img => ({
          uri: `https://backend-practice.eurisko.me${img.url}`,
          type: 'image/jpeg',
          name: `image-${img._id}.jpg`,
          _id: img._id, 
        }));
        setProductImages(formattedImages);
      }

     
      if (product.location) {
        setLocation({
          name: product.location.name,
          latitude: product.location.latitude,
          longitude: product.location.longitude,
        });
      }
    }
  }, [product, reset]);  const styles = editProductScreenStyles(theme);
  const globalStyles = global(theme);

  const handleLocationSelect = (selectedLocation: {name: string, longitude: number, latitude: number}) => {
    setLocation(selectedLocation);
    setIsLocationPickerVisible(false);
  };

  const onSubmit = async (data: ProductFormData) => {
    
    if (productImages.length === 0) {
      setImageError('Please add at least one product image');
      return;
    } else {
      setImageError(null);
    }

    if (!location) {
      console.log('Location is required');
      return;
    }

    
    mutate({
      _id: productId,
      ...data,
      images: productImages,
      location: location,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.background,
      }}>
      <CustomHeader text="Edit Product" />

      {pendingProduct ? (
        <View style={[globalStyles.container, {alignItems: 'center', justifyContent: 'center'}]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{marginTop: 20, color: theme.text}}>Loading product...</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={globalStyles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={globalStyles.container}>
              <Text style={styles.title}>Update Product</Text>

              {(productError || editError) && <FormErrorDisplay error={(productError || editError)?.message || 'An error occurred'} />}

              <ProductImagePicker
                images={productImages}
                onImagesChange={newImages => {
                  setProductImages(newImages);
                  if (newImages.length > 0) {
                    setImageError(null);
                  }
                }}
              />
              {imageError && <Text style={styles.imageError}>{imageError}</Text>}

              
              <FormInputContainer
                label="Product Name"
                control={control}
                name="title"
                placeholder="Enter product name"
                errors={errors}
              />

              
              <FormInputContainer
                label="Description"
                control={control}
                name="description"
                placeholder="Enter product description"
                errors={errors}
              />

              
              <FormInputContainer
                label="Price ($)"
                control={control}
                name="price"
                placeholder="Enter product price"
                keyboardType="numeric"
                errors={errors}
              />

              
              <View style={styles.locationContainer}>
                <Text style={styles.label}>Location</Text>
                <Pressable onPress={() => setIsLocationPickerVisible(true)} style={styles.locationInput}>
                  <Text style={styles.locationText}>
                    {location ? location.name : 'Select Location'}
                  </Text>
                </Pressable>
              </View>

              
              <View style={styles.buttonContainer}>
                <SubmitButton
                  text="Update Product"
                  onPress={handleSubmit(onSubmit)}
                  isLoading={pendingEdit}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      <LocationPicker
        isVisible={isLocationPickerVisible}
        onClose={() => setIsLocationPickerVisible(false)}
        onLocationSelect={handleLocationSelect}
        initialRegion={location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      />
    </View>
  );
};

export default EditProductScreen;
