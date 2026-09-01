import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthPage from './pages/AuthPage';
import AccountTypePage from './pages/AccountTypePage';
import PublicProfileSetup from './pages/PublicProfileSetup';
import NetajiProfileSetup from './pages/NetajiProfileSetup';
import FeedPage from './pages/FeedPage';

export type RootStackParamList = {
  Auth: undefined;
  AccountType: undefined;
  PublicProfileSetup: undefined;
  NetajiProfileSetup: undefined;
  Feed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="AccountType" component={AccountTypePage} />
        <Stack.Screen name="PublicProfileSetup" component={PublicProfileSetup} />
        <Stack.Screen name="NetajiProfileSetup" component={NetajiProfileSetup} />
        <Stack.Screen name="Feed" component={FeedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}