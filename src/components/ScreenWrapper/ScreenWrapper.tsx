import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ScreenWrapperStyles';

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  withBottomSafeArea?: boolean;
};

const ScreenWrapper = ({
  children,
  scrollable,
  withBottomSafeArea = false,
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={withBottomSafeArea ? ['top', 'bottom'] : ['top']}
    >
      {scrollable ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
