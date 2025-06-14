import {Image, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useCallback, useMemo, useState} from 'react';
import { productImagePickerStyles } from './productImagePickerStyles';
import {CameraView} from '../CameraView';
import React from 'react';

interface ProductImagePickerProps {
  images: Array<{uri: string, type: string, name: string}>;
  onImagesChange: (newImages: Array<{uri: string, type: string, name: string}>) => void;
}

const ProductImagePicker = ({images, onImagesChange}: ProductImagePickerProps) => {
  const {theme} = useTheme();

  const [showImageModal, setShowImageModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

    const styles = useMemo(() => productImagePickerStyles(theme), [theme]);
  
  const handleAddImagePress = useCallback(() => {
    setShowImageModal(true);
  }, []);
  
  const handleGalleryPress = useCallback(async () => {
    setShowImageModal(false);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5 - images.length, 
        quality: 0.8,
      });
      
      if (result.assets && result.assets.length > 0) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri || '',
          type: asset.type || 'image/jpeg',
          name: asset.fileName || 'image.jpg',
        }));
        onImagesChange([...images, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image from gallery:', error);
    }
  }, [images, onImagesChange]);
  
  const handleCameraPress = useCallback(() => {
    setShowImageModal(false);
    setShowCamera(true);
  }, []);
  
  const handlePhotoTaken = useCallback((photo: {uri: string}) => {
    const newPhoto = {
      ...photo,
      type: 'image/jpeg', 
      name: `camera_${Date.now()}.jpg`, 
    };
    onImagesChange([...images, newPhoto]);
    setShowCamera(false);
  }, [images, onImagesChange]);
  
  const handleRemoveImage = useCallback((index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onImagesChange(updatedImages);
  }, [images, onImagesChange]);


const closeImageModal = useCallback(() => setShowImageModal(false), []);
  const closeCamera = useCallback(() => setShowCamera(false), []);


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
          <Pressable style={styles.addButton} onPress={handleAddImagePress}>
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
      
      
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Image</Text>
            <Text style={styles.modalSubtitle}>Choose how you'd like to add an image</Text>
            
            <Pressable style={styles.modalOption} onPress={handleCameraPress}>
              <Ionicons name="camera" size={24} color={theme.primary} />
              <Text style={styles.modalOptionText}>Take Photo</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.text} />
            </Pressable>
            
            <Pressable style={styles.modalOption} onPress={handleGalleryPress}>
              <Ionicons name="images" size={24} color={theme.primary} />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.text} />
            </Pressable>
            
            <Pressable 
              style={styles.modalCancelButton} 
              onPress={closeImageModal}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={closeCamera}
      >
        <CameraView
          onPhotoTaken={handlePhotoTaken}
          onClose={closeCamera}
        />
      </Modal>
    </View>
  );
};

export default React.memo(ProductImagePicker);
