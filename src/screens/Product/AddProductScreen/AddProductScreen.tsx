import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FormErrorDisplay } from '../../../components/atoms/FormErrorDisplay';
import { SubmitButton } from '../../../components/atoms/SubmitButton';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import FormInputContainer from '../../../components/molecules/FormInputContainer/FormInputContainer';
import LocationPicker from '../../../components/molecules/LocationPicker/LocationPicker';
import { ProductImagePicker } from '../../../components/molecules/ProductImagePicker';
import { useAddProduct } from '../../../hooks/useAddProduct';
import { ProductFormData, ProductSchema } from '../../../schemas/ProductSchema';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { global } from '../../../styles/global';
import { addProductScreenStyles } from './addProductScreenStyles';

const AddProductScreen = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const { mutate, isPending, error } = useAddProduct();


  const [imageError, setImageError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Array<{uri: string, type: string, name: string}>>([]);
  const [location, setLocation] = useState<{name: string, longitude: number, latitude: number} | null>(null);
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: 'Test Product',
      description: 'This is a test product description',
      price: '20.00',
    },
  });

  const styles = addProductScreenStyles(theme);
  const globalStyles = global(theme);
  const onSubmit = async (data: ProductFormData) => {
    try {
      if (productImages.length === 0) {
        setImageError('Please add at least one product image');
        return;
      } else {
        setImageError(null);
      }      if (!location || !location.latitude || !location.longitude || !location.name) {
        console.log('Location validation failed:', location);
        // Could add a user-facing error here
        return;
      }

      // Validate that latitude and longitude are valid numbers
      if (isNaN(location.latitude) || isNaN(location.longitude)) {
        console.log('Invalid latitude or longitude:', location);
        return;
      }

      // Ensure location name is not empty
      if (!location.name.trim()) {
        console.log('Location name is empty');
        return;
      }

      console.log('Product data:', data);
      console.log('Product images:', productImages);
      console.log('Product location:', location);
      
      // Ensure all image objects have the correct format
      const formattedImages = productImages.map(image => ({
        uri: image.uri,
        type: image.type || 'image/jpeg', // Provide default mime type if missing
        name: image.name || `image-${Date.now()}.jpg`, // Provide default name if missing
      }));
      
      mutate({
        ...data,
        location: {
          name: location.name || 'Unknown Location',
          longitude: location.longitude,
          latitude: location.latitude,
        },
        images: formattedImages,
      });
    } catch (err) {
      console.error('Error in onSubmit:', err);
    }
  };

  const handleLocationSelect = (selectedLocation: {name: string, longitude: number, latitude: number}) => {
    setLocation(selectedLocation);
    setIsLocationPickerVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.background
      }}>
      <CustomHeader text="Add Product" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={globalStyles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={globalStyles.container}>
            <Text style={styles.title}>Create New Product</Text>

            {error && <FormErrorDisplay error={error?.message} />}
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
                text="Add Product"
                onPress={handleSubmit(onSubmit)}
                isLoading={isPending}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LocationPicker
        isVisible={isLocationPickerVisible}
        onClose={() => setIsLocationPickerVisible(false)}
        onLocationSelect={handleLocationSelect}
      />
    </View>
  );
};

export default AddProductScreen;
