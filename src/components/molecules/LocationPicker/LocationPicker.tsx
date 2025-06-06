import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';

import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { locationPickerStyles } from './locationPickerStyles';

interface LocationPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    name: string;
  }) => void;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const LocationPicker = ({
  isVisible,
  onClose,
  onLocationSelect,
  initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
}: LocationPickerProps) => {
  const {theme} = useTheme();
  
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const styles = useMemo(() => locationPickerStyles(theme), [theme]);

  const handleMapPress = useCallback((event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  }, []);

  const handleConfirmLocation = useCallback(() => {

    if (selectedLocation) {
      const locationName = `Location ${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`;
      onLocationSelect({
        ...selectedLocation, 
        name: locationName
      });
      console.log('Selected location:', {
        ...selectedLocation,
        name: locationName
      });
      onClose();
    }

  }, [selectedLocation, onLocationSelect, onClose]);

  const getUserCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setSelectedLocation({latitude, longitude});
      console.log('Current location:', position);
    });
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getUserCurrentLocation();
        } else {
          Alert.alert(
            'Location Permission Denied',
            'Please enable location permission in settings.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, [getUserCurrentLocation]);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Select Location</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
        </View>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}>
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>

        <View style={styles.footer}>
          <Pressable
            style={({pressed}) => [
              styles.confirmButton,
              {opacity: pressed || !selectedLocation ? 0.7 : 1},
            ]}
            onPress={handleConfirmLocation}
            disabled={!selectedLocation}>
            <Text style={styles.confirmButtonText}>Confirm Location</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LocationPicker;
