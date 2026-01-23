import { View, Text, Pressable } from 'react-native';
import { styles } from './EventStatusTabsStyle';

const TABS = ['ALL', 'LIVE', 'UPCOMING', 'OPEN'] as const;

type EventStatusTabProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

const EventStatusTabs = ({ activeTab, onChange }: EventStatusTabProps) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default EventStatusTabs;
