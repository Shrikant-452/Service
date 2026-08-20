import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapPin, ChevronRight, Check } from 'lucide-react-native';
import { Header } from '../components/Header';
import { AVAILABLE_DATES, TIME_SLOTS, SAVED_ADDRESSES } from '../mock/mockData';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const servicePrice = route.params?.price || 599;
  const platformFee = 30;
  const totalAmount = servicePrice + platformFee;

  const [selectedDate, setSelectedDate] = useState(AVAILABLE_DATES[1].date); // 21 May
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('12:00 PM');
  const [selectedAddressId, setSelectedAddressId] = useState(SAVED_ADDRESSES[0].id);
  const [providerNotes, setProviderNotes] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
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
  }, [fadeAnim, slideAnim]);

  const handleConfirmBooking = () => {
    navigation.navigate('LiveTracking', {
      bookingId: '#SRV123456',
      otp: '2468',
      providerName: 'Ramesh Kumar',
      providerRating: 4.8,
      serviceTitle: route.params?.serviceTitle || 'AC Repair & Service',
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Header
          showBack
          title="Book Service"
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date Selector */}
        <Text style={styles.sectionHeading}>Select Date & Time</Text>
        <Text style={styles.monthText}>May 2024</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesContainer}
        >
          {AVAILABLE_DATES.map((item) => {
            const isSelected = item.date === selectedDate;
            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                onPress={() => setSelectedDate(item.date)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDateText]}>
                  {item.day}
                </Text>
                <Text style={[styles.dateNumberText, isSelected && styles.selectedDateText]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time Slot Selector */}
        <Text style={styles.subHeading}>Select Time Slot</Text>
        <View style={styles.timeSlotsContainer}>
          {TIME_SLOTS.map((slot) => {
            const isSelected = slot === selectedTimeSlot;
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.timeSlotCard, isSelected && styles.selectedTimeSlotCard]}
                onPress={() => setSelectedTimeSlot(slot)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    isSelected && styles.selectedTimeSlotText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Address Selection */}
        <Text style={styles.sectionHeading}>Address</Text>
        {SAVED_ADDRESSES.map((addr) => {
          const isSelected = addr.id === selectedAddressId;
          return (
            <TouchableOpacity
              key={addr.id}
              style={[styles.addressCard, isSelected && styles.selectedAddressCard]}
              onPress={() => setSelectedAddressId(addr.id)}
              activeOpacity={0.8}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressLabelRow}>
                  <MapPin size={16} color={COLORS.primary} />
                  <Text style={styles.addressLabel}>{addr.label}</Text>
                </View>
                {isSelected && (
                  <View style={styles.checkCircle}>
                    <Check size={12} color={COLORS.white} />
                  </View>
                )}
              </View>
              <Text style={styles.addressText}>{addr.fullAddress}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Notes for Provider */}
        <Text style={styles.sectionHeading}>Add Notes for Provider</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="e.g. Please bring your own tools"
          placeholderTextColor={COLORS.textMuted}
          value={providerNotes}
          onChangeText={setProviderNotes}
          multiline
        />

        {/* Price Details */}
        <View style={styles.priceDetailsCard}>
          <Text style={styles.priceDetailsTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceRowLabel}>Service Charges</Text>
            <Text style={styles.priceRowValue}>₹{servicePrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceRowLabel}>Platform Fee</Text>
            <Text style={styles.priceRowValue}>₹{platformFee}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking (₹{totalAmount})</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 90,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 10,
    marginBottom: 8,
  },
  monthText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  datesContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  dateCard: {
    width: 60,
    height: 68,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDateCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dateNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  selectedDateText: {
    color: COLORS.white,
  },
  subHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 14,
    marginBottom: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  timeSlotCard: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTimeSlotCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedTimeSlotText: {
    color: COLORS.white,
  },
  addressCard: {
    backgroundColor: COLORS.background,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedAddressCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryBg,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  addressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  notesInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 70,
    marginBottom: 16,
  },
  priceDetailsCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  priceDetailsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceRowLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  priceRowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.medium,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
