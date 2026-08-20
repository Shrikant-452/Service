import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react-native';
import { Header } from '../components/Header';
import { AC_REPAIR_SERVICE_DETAILS } from '../mock/mockData';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetails'>;

export const ServiceDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const service = AC_REPAIR_SERVICE_DETAILS;

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

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Header
          showBack
          title={route.params?.title || service.title}
          onBackPress={() => navigation.goBack()}
        />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: service.heroImage }} style={styles.heroImage} />
        </View>

        {/* Rating & Review Summary */}
        <View style={styles.ratingBadgeContainer}>
          <Star size={16} color={COLORS.accentGold} fill={COLORS.accentGold} />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewCount}>({service.reviewsCount} reviews)</Text>
        </View>

        {/* Service Description */}
        <Text style={styles.serviceDescription}>{service.description}</Text>

        {/* Price & Badges Bar */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Price Starts From</Text>
          <Text style={styles.priceValue}>₹{service.startingPrice}</Text>

          <View style={styles.guaranteeRow}>
            <View style={styles.guaranteeBadge}>
              <ShieldCheck size={16} color={COLORS.primary} />
              <Text style={styles.guaranteeText}>{service.warrantyDays}-Day Warranty</Text>
            </View>
            <View style={styles.guaranteeBadge}>
              <Clock size={16} color={COLORS.primary} />
              <Text style={styles.guaranteeText}>{service.responseTimeMins} Mins Response Time</Text>
            </View>
          </View>
        </View>

        {/* What's Included Checklist */}
        <View style={styles.includedSection}>
          <Text style={styles.sectionHeading}>What's Included</Text>
          {service.whatsIncluded.map((item, index) => (
            <View key={index} style={styles.checkRow}>
              <CheckCircle2 size={18} color={COLORS.primary} />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('Booking', {
              serviceId: service.id,
              serviceTitle: service.title,
              price: service.startingPrice,
            })
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
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
    paddingTop: 12,
    paddingBottom: 90,
  },
  imageWrapper: {
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  reviewCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  priceCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  guaranteeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  includedSection: {
    marginTop: 6,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  checkText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
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
  bookButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
