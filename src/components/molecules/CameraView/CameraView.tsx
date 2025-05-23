import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { cameraViewStyles } from './cameraViewStyles';


interface CameraViewProps {
  onPhotoTaken: (photo: {uri: string}) => void;
  onClose: () => void;
}

const CameraView = ({onPhotoTaken, onClose}: CameraViewProps) => {
  const {theme} = useTheme();
  const styles = cameraViewStyles(theme);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleTakePhoto = async () => {
    if (!camera.current || !device) return;

    try {
      setIsLoading(true);
      const photo: PhotoFile = await camera.current.takePhoto({
        qualityPrioritization: 'balanced',
        enableAutoRedEyeReduction: true,
        enableAutoStabilization: true,
      });

      
      const photoUri = `file://${photo.path}`;
      onPhotoTaken({uri: photoUri});
      onClose();
    } catch (error) {
      console.error('Error taking photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color={theme.text} />
          <Text style={styles.permissionText}>Camera permission required</Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera not available</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      
      
      <View style={styles.header}>
        <Pressable style={styles.headerCloseButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="white" />
        </Pressable>
      </View>

      
      <View style={styles.bottomControls}>
        <View style={styles.controlsRow}>
          <View style={styles.spacer} />
          
          
          <Pressable
            style={[styles.captureButton, isLoading && styles.captureButtonDisabled]}
            onPress={handleTakePhoto}
            disabled={isLoading}>
            <View style={styles.captureButtonInner} />
          </Pressable>
          
          <View style={styles.spacer} />
        </View>
      </View>
    </View>
  );
};

export default CameraView;
