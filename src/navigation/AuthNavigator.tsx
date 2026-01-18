import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RegisterScreen from '../views/RegisterScreen';
import LoginScreen from '../views/LoginScreen';
import RoleSelectionScreen from '../views/RoleSelectionScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
