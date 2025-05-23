import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';
import { productImagePickerStyles } from './productImagePickerStyles';

interface ProductImagePickerProps {
  images: Array<{uri: string}>;
  onImagesChange: (newImages: Array<{uri: string}>) => void;
}

const ProductImagePicker = ({images, onImagesChange}: ProductImagePickerProps) => {
  const {theme} = useTheme();
  const styles = productImagePickerStyles(theme);
  
  const handleAddImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5,
        quality: 0.8,
      });
      
      if (result.assets && result.assets.length > 0) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri || '',
        }));
        onImagesChange([...images, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onImagesChange(updatedImages);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Images</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image.uri}} style={styles.image} />
            <Pressable 
              style={styles.removeButton}
              onPress={() => handleRemoveImage(index)}
            >
              <Ionicons name="close-circle" size={24} color={theme.errorText} />
            </Pressable>
          </View>
        ))}
        
        {images.length < 5 && (
          <Pressable style={styles.addButton} onPress={handleAddImage}>
            <Ionicons name="add" size={40} color={theme.primary} />
            <Text style={styles.addButtonText}>
              Add Image ({images.length}/5)
            </Text>
          </Pressable>
        )}
      </ScrollView>
      {images.length === 0 && (
        <Text style={styles.helperText}>Add at least one product image</Text>
      )}
    </View>
  );
};

export default ProductImagePicker;
