import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Phone, MessageSquare, Star, KeyRound, CheckCircle } from 'lucide-react-native';
import { Header } from '../components/Header';
import { MapViewMock } from '../components/MapViewMock';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';
import {
  initSocket,
  joinBookingRoom,
  subscribeToLocationUpdates,
  subscribeToStatusUpdates,
  disconnectSocket,
} from '../sockets/socketManager';

type Props = NativeStackScreenProps<RootStackParamList, 'LiveTracking'>;

export const LiveTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const bookingId = route.params?.bookingId || '#SRV123456';
  const otp = route.params?.otp || '2468';
  const providerName = route.params?.providerName || 'Ramesh Kumar';
  const providerRating = route.params?.providerRating || 4.8;

  const [etaMins, setEtaMins] = useState(12);
  const [jobStatus, setJobStatus] = useState('Technician is on the way');

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

  useEffect(() => {
    // Setup Socket.io real-time connection
    let isSubscribed = true;

    initSocket().then(() => {
      if (!isSubscribed) return;
      joinBookingRoom(bookingId);

      // Listen for location updates from provider app
      subscribeToLocationUpdates((data) => {
        if (data.etaMins !== undefined) {
          setEtaMins(data.etaMins);
        }
      });

      // Listen for job status changes (e.g. Arrived, In Progress, Complete)
      subscribeToStatusUpdates((data) => {
        if (data.status === 'completed') {
          navigation.navigate('ServiceComplete', {
            bookingId,
            providerName,
            totalAmount: 629,
          });
        } else if (data.status) {
          setJobStatus(data.status);
        }
      });
    });

    return () => {
      isSubscribed = false;
      disconnectSocket();
    };
  }, [bookingId, navigation, providerName]);

  const handleCompleteService = () => {
    navigation.navigate('ServiceComplete', {
      bookingId,
      providerName,
      totalAmount: 629,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Header
          showBack
          title="Service in Progress"
          onBackPress={() => navigation.goBack()}
        />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Map View with live ETA */}
        <MapViewMock etaMins={etaMins} />

        {/* Real-time Status Badge */}
        <View style={styles.statusLiveCard}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusLiveText}>{jobStatus}</Text>
        </View>

        {/* Technician Info Card */}
        <View style={styles.providerCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
            }}
            style={styles.avatar}
          />

          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{providerName}</Text>
            <Text style={styles.providerSpecialty}>AC Repair Specialist</Text>
            <View style={styles.ratingRow}>
              <Star size={13} color={COLORS.accentGold} fill={COLORS.accentGold} />
              <Text style={styles.ratingText}>{providerRating}</Text>
            </View>
          </View>

          {/* Call & Chat Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.iconCircleButton} activeOpacity={0.8}>
              <Phone size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircleButton} activeOpacity={0.8}>
              <MessageSquare size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Booking & Verification Code Box */}
        <View style={styles.verificationCard}>
          <View style={styles.verifRow}>
            <Text style={styles.verifLabel}>Booking ID</Text>
            <Text style={styles.verifValue}>{bookingId}</Text>
          </View>

          <View style={styles.otpContainer}>
            <View style={styles.otpHeaderRow}>
              <KeyRound size={16} color={COLORS.primary} />
              <Text style={styles.otpLabel}>OTP for Verification</Text>
            </View>
            <View style={styles.otpBox}>
              <Text style={styles.otpCodeText}>{otp}</Text>
            </View>
            <Text style={styles.otpSubtext}>Share this code with technician upon arrival</Text>
          </View>
        </View>

        {/* Simulation / Complete Service CTA */}
        <TouchableOpacity
          style={styles.simCompleteButton}
          onPress={handleCompleteService}
          activeOpacity={0.85}
        >
          <CheckCircle size={18} color={COLORS.white} />
          <Text style={styles.simCompleteText}>Complete Job (Demo Flow)</Text>
        </TouchableOpacity>
      </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 30,
  },
  statusLiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  statusLiveText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  providerSpecialty: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 16,
  },
  verifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  verifLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  verifValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  otpContainer: {
    alignItems: 'center',
    paddingTop: 14,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  otpLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  otpBox: {
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginVertical: 6,
  },
  otpCodeText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 8,
  },
  otpSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  simCompleteButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  simCompleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});
