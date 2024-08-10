import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootStack';
import { navigationRef } from '../utils/navigationUtils';
const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar translucent barStyle={'dark-content'} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
