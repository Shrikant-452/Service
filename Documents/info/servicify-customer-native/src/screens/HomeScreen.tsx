import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import { ProviderCard } from '../components/ProviderCard';
import { AC_REPAIR_SERVICE_DETAILS } from '../mock/mockData';
import { COLORS, SHADOWS } from '../theme/colors';
import { fetchHomeData } from '../services/api';
import { RootStackParamList, TabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [popularProviders, setPopularProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeData();
        setCategories(data.categories);
        setPopularProviders(data.popularProviders);
        
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
        console.error('Failed to fetch home data', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fadeAnim, slideAnim]);

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('ServiceDetails', {
      serviceId: categoryId,
      title: categoryName,
    });
  };

  const handleBookProvider = (providerId: string) => {
    navigation.navigate('ServiceDetails', {
      serviceId: AC_REPAIR_SERVICE_DETAILS.id,
      title: AC_REPAIR_SERVICE_DETAILS.title,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        showSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Loading services...</Text>
        </View>
      ) : (
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        {/* Promotional Offer Banner */}
        <TouchableOpacity
          style={styles.banner}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('ServiceDetails', {
              serviceId: AC_REPAIR_SERVICE_DETAILS.id,
              title: AC_REPAIR_SERVICE_DETAILS.title,
            })
          }
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>15% OFF</Text>
            <Text style={styles.bannerSubtitle}>on First Service</Text>
            <TouchableOpacity style={styles.bannerCta}>
              <Text style={styles.bannerCtaText}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerIllustration}>📦✨</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id, category.name)}
            />
          ))}
        </View>

        {/* Popular Near You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {popularProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onBookPress={() => handleBookProvider(provider.id)}
          />
        ))}
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 10,
  },
  bannerCta: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerCtaText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bannerIllustration: {
    fontSize: 42,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});
