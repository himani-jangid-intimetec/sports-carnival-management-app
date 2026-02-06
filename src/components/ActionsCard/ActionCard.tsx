import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './ActionCardStyles';

type ActionCardProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

const ActionCard = ({ icon, title, onPress }: ActionCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ActionCard;
