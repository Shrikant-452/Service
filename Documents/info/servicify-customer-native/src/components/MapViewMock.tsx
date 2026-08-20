import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Navigation, MapPin } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';

interface MapViewMockProps {
  providerAvatar?: string;
  etaMins?: number;
}

export const MapViewMock: React.FC<MapViewMockProps> = ({
  providerAvatar = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
  etaMins = 12,
}) => {
  return (
    <View style={styles.mapContainer}>
      {/* Map Background Grid & Vector Routes */}
      <View style={styles.gridOverlay}>
        <View style={styles.streetHorizontal1} />
        <View style={styles.streetHorizontal2} />
        <View style={styles.streetVertical1} />
        <View style={styles.streetVertical2} />
        <View style={styles.routePolyline} />
      </View>

      {/* ETA Header Pill */}
      <View style={styles.etaBadge}>
        <Navigation size={16} color={COLORS.primary} />
        <Text style={styles.etaText}>Technician arriving in <Text style={styles.etaHighlight}>{etaMins} mins</Text></Text>
      </View>

      {/* Provider Vehicle/Marker */}
      <View style={[styles.markerContainer, styles.providerMarkerPos]}>
        <View style={styles.providerMarkerBubble}>
          <Image source={{ uri: providerAvatar }} style={styles.providerAvatar} />
        </View>
        <View style={styles.markerPinTail} />
      </View>

      {/* Customer Location Pin */}
      <View style={[styles.markerContainer, styles.customerMarkerPos]}>
        <View style={styles.customerMarkerBubble}>
          <MapPin size={20} color={COLORS.white} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 260,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#F1F5F9',
  },
  streetHorizontal1: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#E2E8F0',
  },
  streetHorizontal2: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#E2E8F0',
  },
  streetVertical1: {
    position: 'absolute',
    left: '30%',
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#E2E8F0',
  },
  streetVertical2: {
    position: 'absolute',
    left: '70%',
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#E2E8F0',
  },
  routePolyline: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    width: '40%',
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    transform: [{ rotate: '25deg' }],
  },
  etaBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.medium,
  },
  etaText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  etaHighlight: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  providerMarkerPos: {
    top: '30%',
    left: '25%',
  },
  customerMarkerPos: {
    top: '60%',
    left: '68%',
  },
  providerMarkerBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    padding: 3,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  providerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  markerPinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
    marginTop: -2,
  },
  customerMarkerBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
});
