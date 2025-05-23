import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ViewStyle
} from 'react-native';
import MapViewLib, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { mapViewStyles } from './mapViewStyles';

interface MapViewProps {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  style?: ViewStyle;
  interactive?: boolean;
}

const MapView = ({location, style, interactive = true}: MapViewProps) => {
  const {theme} = useTheme();
  const styles = mapViewStyles(theme);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01, 
    longitudeDelta: 0.01,
  };
  
  useEffect(() => {
    console.log('MapView: Received location:', location);
    try {
      
      if (
        !location.latitude ||
        !location.longitude ||
        isNaN(location.latitude) ||
        isNaN(location.longitude) ||
        location.latitude < -90 ||
        location.latitude > 90 ||
        location.longitude < -180 ||
        location.longitude > 180
      ) {
        console.log('MapView: Invalid coordinates detected');
        throw new Error('Invalid location coordinates');
      }
      
      console.log('MapView: Coordinates are valid, resetting error state');
      setMapError(null);
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
    }
  }, [location]);

  console.log(
    'MapView: Rendering with mapError:',
    mapError,
    'isMapReady:',
    isMapReady,
  );
  return (
    <View style={[styles.container, style]}>
      {mapError ? (
        
        <View style={styles.mapPlaceholder}>
          <Feather name="map" size={40} color={theme.subheadingText} />
          <Text style={styles.mapText}>
            Unable to load map. Location coordinates:
          </Text>
          <Text style={styles.coordinatesText}>
            {location.latitude}, {location.longitude}
          </Text>
          <View style={styles.marker}>
            <Feather name="map-pin" size={24} color={theme.primary} />
            <Text style={styles.markerText}>{location.name}</Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {!isMapReady && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={styles.loadingText}>Loading map...</Text>
            </View>
          )}
          <MapViewLib
            provider={PROVIDER_GOOGLE}
            style={[styles.map, {height: 200, width: '100%'}]}
            initialRegion={initialRegion}
            onMapReady={() => {
              console.log('Map is ready');
              setIsMapReady(true);
            }}
            zoomEnabled={interactive}
            scrollEnabled={interactive}
            rotateEnabled={interactive}
            pitchEnabled={interactive}
            showsUserLocation={false}
            showsMyLocationButton={false}>
            <Marker
              key={`marker-${location.latitude}-${location.longitude}`}
              coordinate={{
                latitude: Number(location.latitude),
                longitude: Number(location.longitude),
              }}
              title={location.name}
              description={`${location.latitude.toFixed(
                6,
              )}, ${location.longitude.toFixed(6)}`}>
              {interactive && (
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{location.name}</Text>
                    <Text style={styles.calloutText}>
                      {location.latitude.toFixed(6)},
                      {location.longitude.toFixed(6)}
                    </Text>
                  </View>
                </Callout>
              )}
            </Marker>
          </MapViewLib>
        </View>
      )}
    </View>
  );
};

export default MapView;
