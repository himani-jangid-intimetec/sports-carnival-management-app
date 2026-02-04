import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './CategoryCardStyles';
import { useCategoryCardViewModel } from './CategoryCardViewModel';

type CategoryCardProps = {
  title: string;
  format: 'Singles' | 'Doubles';
  gender: 'Male' | 'Female';
  participantCount: number;
  teamCount?: number;
  onPress: () => void;
};

const CategoryCard = ({
  title,
  format,
  gender,
  participantCount,
  teamCount,
  onPress,
}: CategoryCardProps) => {
  const { iconColor, Icon, showTeams } = useCategoryCardViewModel({
    format,
    gender,
    teamCount,
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}
      >
        <Icon size={24} color={iconColor} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>{participantCount} Participants</Text>

          {showTeams && (
            <Text style={styles.statsText}> • {teamCount} Teams</Text>
          )}
        </View>
      </View>

      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
