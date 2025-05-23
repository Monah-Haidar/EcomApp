import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {CustomHeader} from '../../../components/molecules/CustomHeader';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {addProductScreenStyles} from './addProductScreenStyles';
import {global} from '../../../styles/global';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import FormInputContainer from '../../../components/molecules/FormInputContainer/FormInputContainer';
import {SubmitButton} from '../../../components/atoms/SubmitButton';
import {useState} from 'react';
import {ProductImagePicker} from '../../../components/molecules/ProductImagePicker';
import {ProductSchema, ProductFormData} from '../../../schemas/ProductSchema';
import { useAddProduct } from '../../../hooks/useAddProduct';

const EditProductScreen = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
//   const { mutate, isPending, error } = useAddProduct();

  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Array<{uri: string, type: string, name: string}>>([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: ,
      description: ,
      price: ,
      location: ,
    },
  });

  const styles = addProductScreenStyles(theme);
  const globalStyles = global(theme);

  // console.log('ERROR', error?.message);

  const onSubmit = async (data: ProductFormData) => {
    // Validate images
    if (productImages.length === 0) {
      setImageError('Please add at least one product image');
      return;
    } else {
      setImageError(null);
    }

    console.log('Product data:', data);
    console.log('Product images:', productImages);
    mutate({
      ...data,
      images: productImages,
    })
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
      {/* <Text style={styles.title}>Create New Product</Text> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={globalStyles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={globalStyles.container}>
            <Text style={styles.title}>Create New Product</Text>
            {/* Product Images */}
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

            {/* Product Name */}
            <FormInputContainer
              label="Product Name"
              control={control}
              name="title"
              placeholder="Enter product name"
              errors={errors}
            />

            {/* Product Description */}
            <FormInputContainer
              label="Description"
              control={control}
              name="description"
              placeholder="Enter product description"
              errors={errors}
            />

            {/* Product Price */}
            <FormInputContainer
              label="Price ($)"
              control={control}
              name="price"
              placeholder="Enter product price"
              keyboardType="numeric"
              errors={errors}
            />

            {/* Product Location */}
            <FormInputContainer
              label="Location"
              control={control}
              name="location"
              placeholder="Enter product location"
              errors={errors}
            />
            {/* Submit Button */}
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
    </View>
  );
};

export default EditProductScreen;
