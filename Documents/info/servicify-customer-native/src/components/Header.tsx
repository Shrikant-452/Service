import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MapPin, Search, ChevronDown, ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

interface HeaderProps {
  showBack?: boolean;
  onBackPress?: () => void;
  title?: string;
  location?: string;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBackPress,
  title,
  location = 'Mumbai, Maharashtra',
  showSearch = false,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <View style={styles.titleRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
            <ArrowLeft size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.placeholder} />
        </View>
      ) : (
        <>
          {/* Location Selector */}
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.8}>
            <MapPin size={18} color={COLORS.primary} />
            <Text style={styles.locationText}>{location}</Text>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Search Input */}
          {showSearch && (
            <View style={styles.searchBarContainer}>
              <Search size={18} color={COLORS.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a service..."
                placeholderTextColor={COLORS.textMuted}
                value={searchQuery}
                onChangeText={onSearchChange}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 36,
  },
});
