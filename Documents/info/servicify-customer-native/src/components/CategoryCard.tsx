import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Zap, Droplet, Wind, Sparkles, Hammer, Paintbrush } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { Category } from '../mock/mockData';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const renderIcon = () => {
    const size = 22;
    const color = COLORS.primary;
    switch (category.iconName) {
      case 'zap':
        return <Zap size={size} color={color} />;
      case 'droplet':
        return <Droplet size={size} color={color} />;
      case 'wind':
        return <Wind size={size} color={color} />;
      case 'sparkles':
        return <Sparkles size={size} color={color} />;
      case 'hammer':
        return <Hammer size={size} color={color} />;
      case 'paintbrush':
        return <Paintbrush size={size} color={color} />;
      default:
        return <Zap size={size} color={color} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.iconCircle, { backgroundColor: category.iconBg }]}>
        {renderIcon()}
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '30%',
    marginVertical: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
