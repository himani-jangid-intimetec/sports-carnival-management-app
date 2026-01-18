import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Check } from 'lucide-react-native';

type RoleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  isSelected?: boolean;
  onPress?: () => void;
};

const RoleCard = ({
  icon,
  description,
  title,
  features,
  isSelected,
  onPress,
}: RoleCardProps) => {
  return (
    <Pressable
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      {isSelected && (
        <View style={styles.checkIcon}>
          <Check size={18} color={colors.background} />
        </View>
      )}
      <View>
        {icon}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bullet: {
    color: colors.primary,
    fontSize: 16,
    marginRight: 6,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  checkIcon: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 4,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  featureItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 6,
  },
  featureText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 16,
  },
  features: {
    marginTop: 8,
  },
  selectedCard: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});

export default RoleCard;
