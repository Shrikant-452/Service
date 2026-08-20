import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { fetchBookingsList } from '../services/api';
import { Header } from '../components/Header';

interface Booking {
  id: string;
  serviceTitle: string;
  providerName: string;
  date: string;
  time: string;
  status: string;
  price: number;
}

export const BookingsListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await fetchBookingsList();
      setBookings(data as Booking[]);
      
      // Trigger entrance animation once data is loaded
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
      
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Fetching your bookings...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <AlertCircle size={48} color={COLORS.danger} style={{ marginBottom: 12 }} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadBookings}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (bookings.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Calendar size={64} color={COLORS.border} style={{ marginBottom: 16 }} />
          <Text style={styles.emptyTitle}>No Bookings Found</Text>
          <Text style={styles.emptySub}>You haven't booked any services yet.</Text>
        </View>
      );
    }

    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {bookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard} activeOpacity={0.8}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingId}>{booking.id}</Text>
                <View style={[styles.statusBadge, booking.status === 'Completed' ? styles.statusCompleted : styles.statusUpcoming]}>
                  <Text style={[styles.statusText, booking.status === 'Completed' ? styles.statusCompletedText : styles.statusUpcomingText]}>
                    {booking.status}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.serviceTitle}>{booking.serviceTitle}</Text>
              <Text style={styles.providerName}>with {booking.providerName}</Text>
              
              <View style={styles.divider} />
              
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Calendar size={14} color={COLORS.textSecondary} />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color={COLORS.textSecondary} />
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
              </View>
              
              <View style={styles.bookingFooter}>
                <Text style={styles.priceText}>₹{booking.price}</Text>
                <View style={styles.viewDetailsRow}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <ChevronRight size={16} color={COLORS.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingId: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusUpcoming: {
    backgroundColor: '#FFFBEB',
  },
  statusCompleted: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusUpcomingText: {
    color: '#D97706',
  },
  statusCompletedText: {
    color: '#059669',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginBottom: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
