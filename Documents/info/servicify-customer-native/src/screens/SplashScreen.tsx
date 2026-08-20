import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShieldCheck, Award, Clock, Lock } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Brand Logo & Emblem */}
        <View style={styles.logoContainer}>
          <View style={styles.emblemRing}>
            <Text style={styles.emblemIcon}>🛠️</Text>
          </View>
          <Text style={styles.brandTitle}>SERVICIFY</Text>
          <Text style={styles.brandTagline}>— Skilled. Verified. At Your Door. —</Text>
        </View>

        {/* Hero Vector Graphic */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Platform Overview */}
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewHeading}>PLATFORM OVERVIEW</Text>
          <Text style={styles.overviewText}>
            Servicify connects you with verified, skilled professionals for all your home service needs. Fast, Reliable, Affordable.
          </Text>

          {/* Badges */}
          <View style={styles.badgesGrid}>
            <View style={styles.badgeItem}>
              <ShieldCheck size={20} color={COLORS.primary} />
              <Text style={styles.badgeText}>Verified Professionals</Text>
            </View>
            <View style={styles.badgeItem}>
              <Award size={20} color={COLORS.primary} />
              <Text style={styles.badgeText}>Affordable Pricing</Text>
            </View>
            <View style={styles.badgeItem}>
              <Clock size={20} color={COLORS.primary} />
              <Text style={styles.badgeText}>On-time Service</Text>
            </View>
            <View style={styles.badgeItem}>
              <Lock size={20} color={COLORS.primary} />
              <Text style={styles.badgeText}>Safe & Secure</Text>
            </View>
          </View>
        </View>

        {/* Manual CTA */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.replace('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emblemRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  emblemIcon: {
    fontSize: 34,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 4,
  },
  heroImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginVertical: 14,
  },
  overviewContainer: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  overviewHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
    letterSpacing: 1,
  },
  overviewText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  getStartedText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
