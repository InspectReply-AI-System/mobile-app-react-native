import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootStack';
import { navigationRef } from '../utils/navigationUtils';
const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar translucent />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
