import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './AnalyticsCardStyles';

type AnalyticsCardProps = {
  icon: React.ReactNode;
  data: number;
  title: string;
};

const AnalyticsCard = ({ icon, data, title }: AnalyticsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <Text style={styles.data}>{data}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default AnalyticsCard;
