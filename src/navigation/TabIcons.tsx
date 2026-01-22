import React from 'react';
import { Home, Calendar } from 'lucide-react-native';
import { colors } from '../theme/colors';

export const TabIcons = {
  Home: (focused: boolean) => (
    <Home color={focused ? colors.primary : colors.textSecondary} size={22} />
  ),
  Events: (focused: boolean) => (
    <Calendar
      color={focused ? colors.primary : colors.textSecondary}
      size={22}
    />
  ),
};
