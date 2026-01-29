import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { EventProvider } from './src/store/EventStore';
import { AuthProvider } from './src/store/AuthStore';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
