import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ShieldCheck, Heart, FileText } from 'lucide-react-native';
import { RatingStars } from '../components/RatingStars';
import { COLORS, SHADOWS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceComplete'>;

export const ServiceCompleteScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | null>(50);

  const tipsOptions = [50, 100, 200];

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

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setSelectedTags([]); // Reset tags when rating changes
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const positiveTags = ['Polite Behavior', 'Excellent Service', 'Clean & Tidy', 'On Time', 'Great Value'];
  const negativeTags = ['Late Arrival', 'Unprofessional', 'Poor Quality', 'Messy Work', 'Overcharged'];

  const currentTags = rating >= 4 ? positiveTags : negativeTags;

  const handleSubmitReview = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
        {/* Top Success Banner */}
        <View style={styles.successHeader}>
          <View style={styles.checkIconRing}>
            <CheckCircle2 size={54} color={COLORS.white} />
          </View>
          <Text style={styles.successTitle}>Service Completed Successfully!</Text>
        </View>

        {/* Experience Rating Section */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingPrompt}>How was your experience?</Text>
          <RatingStars rating={rating} onRatingChange={handleRatingChange} size={36} />

          {/* Dynamic Feedback Tags (Rapido Style) */}
          {rating > 0 && (
            <View style={styles.feedbackSection}>
              <Text style={styles.feedbackHeading}>
                {rating >= 4 ? 'What did you like?' : 'What went wrong?'}
              </Text>
              <View style={styles.tagsContainer}>
                {currentTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[styles.tagPill, isSelected && styles.selectedTagPill]}
                      onPress={() => toggleTag(tag)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        {/* Tip Section */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Add a tip for your professional</Text>
          <View style={styles.tipsRow}>
            {tipsOptions.map((tip) => {
              const isSelected = selectedTip === tip;
              return (
                <TouchableOpacity
                  key={tip}
                  style={[styles.tipPill, isSelected && styles.selectedTipPill]}
                  onPress={() => setSelectedTip(tip)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tipText, isSelected && styles.selectedTipText]}>
                    ₹{tip}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.tipPill, selectedTip === 0 && styles.selectedTipPill]}
              onPress={() => setSelectedTip(0)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tipText, selectedTip === 0 && styles.selectedTipText]}>
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.invoiceButton}
          onPress={() => navigation.navigate('MainTabs')}
          activeOpacity={0.8}
        >
          <FileText size={16} color={COLORS.primary} />
          <Text style={styles.invoiceButtonText}>View Invoice</Text>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  successHeader: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.medium,
  },
  checkIconRing: {
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
  },
  ratingCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  ratingPrompt: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  feedbackSection: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  feedbackHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tagPill: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  selectedTagPill: {
    backgroundColor: COLORS.primaryBg,
    borderColor: COLORS.primary,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  selectedTagText: {
    color: COLORS.primary,
  },
  tipCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tipsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTipPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tipText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  selectedTipText: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  invoiceButton: {
    height: 46,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  invoiceButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
