import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  size?: number;
  readOnly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRatingChange,
  size = 28,
  readOnly = false,
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((starIndex) => {
        const isFilled = starIndex <= rating;
        return (
          <TouchableOpacity
            key={starIndex}
            disabled={readOnly}
            onPress={() => {
              if (onRatingChange) {
                // If they click the exact current rating, reset to 0
                if (rating === starIndex) {
                  onRatingChange(0);
                } else {
                  onRatingChange(starIndex);
                }
              }
            }}
            activeOpacity={0.7}
            style={styles.starButton}
            hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}
          >
            <Star
              size={size}
              color={isFilled ? COLORS.accentGold : COLORS.border}
              fill={isFilled ? COLORS.accentGold : 'transparent'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
});
