import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { spacing } from '../../../constants/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/font';
import { normalizeFont } from '../../../utils/normalizeFont';
import Feather from 'react-native-vector-icons/Feather';

// In a real app, you'd use a package like react-native-maps
// This is a placeholder component for now

interface MapViewProps {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  style?: ViewStyle;
}

const MapView = ({ location, style }: MapViewProps) => {
  const { theme } = useTheme();
  const styles = mapViewStyles(theme);
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.mapPlaceholder}>
        <Feather name="map" size={40} color={theme.subheadingText} />
        <Text style={styles.mapText}>
          Map view would show here with coordinates:
        </Text>
        <Text style={styles.coordinatesText}>
          {location.latitude}, {location.longitude}
        </Text>
        <View style={styles.marker}>
          <Feather name="map-pin" size={24} color={theme.primary} />
          <Text style={styles.markerText}>{location.name}</Text>
        </View>
      </View>
    </View>
  );
};

const mapViewStyles = (theme: any) => StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  mapPlaceholder: {
    backgroundColor: theme.border,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  mapText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  coordinatesText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginVertical: spacing.xs,
  },
  marker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.cardBackground}CC`,
    padding: spacing.sm,
    borderRadius: spacing.radius_md,
    marginTop: spacing.sm,
  },
  markerText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginLeft: spacing.xs,
  },
});

export default MapView;