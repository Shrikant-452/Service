import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, ShieldCheck } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { Provider } from '../mock/mockData';

interface ProviderCardProps {
  provider: Provider;
  onBookPress: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onBookPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: provider.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
          {provider.isVerified && <ShieldCheck size={16} color={COLORS.primary} />}
        </View>
        
        <View style={styles.ratingRow}>
          <Star size={14} color={COLORS.accentGold} fill={COLORS.accentGold} />
          <Text style={styles.ratingText}>{provider.rating}</Text>
          <Text style={styles.subText}> · {provider.experienceYears}+ yrs exp</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={onBookPress} activeOpacity={0.8}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.border,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  subText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});
