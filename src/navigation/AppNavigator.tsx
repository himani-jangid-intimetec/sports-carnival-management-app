import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AuthNavigator, { AuthStackParamList } from './AuthNavigator';
import AdminTabs from './AdminTabs';
import OrganizerTabs from './OrganizerTabs';
import ParticipantTabs from './ParticipantTabs';
import EventFormScreen from '../views/EventFormScreen/EventFormScreen';
import { Event } from '../models/Event';
import { NavigatorScreenParams } from '@react-navigation/native';
import EventRegistrationScreen from '../views/EventRegistration/EventRegistrationScreen';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  AdminTabs: undefined;
  OrganizerTabs: undefined;
  ParticipantTabs: undefined;
  EventForm: {
    mode: 'create' | 'edit';
    event?: Event;
    onSubmit?: (event: Event) => void;
  };
  EventRegister: {
    eventId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />

      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="OrganizerTabs" component={OrganizerTabs} />
      <Stack.Screen name="ParticipantTabs" component={ParticipantTabs} />

      <Stack.Screen name="EventForm" component={EventFormScreen} />
      <Stack.Screen name="EventRegister" component={EventRegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
