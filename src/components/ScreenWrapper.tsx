import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default ScreenWrapper;
