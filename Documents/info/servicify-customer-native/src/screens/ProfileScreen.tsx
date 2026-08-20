import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Calendar,
  MapPin,
  Wallet,
  Bookmark,
  Share2,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { fetchUserProfile } from '../services/api';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
        
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (e) {
        console.error('Failed to fetch profile', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [fadeAnim, slideAnim]);

  const menuItems = profile ? [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wallet', label: 'Wallet', icon: Wallet, value: `₹${profile.walletBalance}` },
    { id: 'saved', label: 'Saved Providers', icon: Bookmark },
    { id: 'refer', label: 'Refer & Earn', icon: Share2 },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut, isDanger: true },
  ] : [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {isLoading || !profile ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Loading profile...</Text>
        </View>
      ) : (
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.phone}>{profile.phone}</Text>
          </View>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.id === 'logout') {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                  }
                }}
              >
                <View style={styles.menuLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      item.isDanger && styles.dangerIconCircle,
                    ]}
                  >
                    <IconComponent
                      size={18}
                      color={item.isDanger ? COLORS.danger : COLORS.primary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.menuLabel,
                      item.isDanger && styles.dangerMenuLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>

                <View style={styles.menuRight}>
                  {item.value && (
                    <Text style={styles.menuValue}>{item.value}</Text>
                  )}
                  <ChevronRight size={18} color={COLORS.textMuted} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        </ScrollView>
      </Animated.View>
      )}
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
    paddingTop: 16,
    paddingBottom: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  phone: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIconCircle: {
    backgroundColor: '#FEE2E2',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  dangerMenuLabel: {
    color: COLORS.danger,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
