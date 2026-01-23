import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ScreenWrapperStyles';

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const ScreenWrapper = ({ children, scrollable }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.scrollContent}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
