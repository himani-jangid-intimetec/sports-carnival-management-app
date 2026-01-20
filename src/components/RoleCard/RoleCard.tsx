import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { styles } from './RoleCardStyles';

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
          <Check size={18} color={colors.appBackground} />
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

export default RoleCard;
