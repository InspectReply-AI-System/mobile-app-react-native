import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootStack';
import { navigationRef } from '../utils/navigationUtils';
import ToastMesssge from '@inspectreplyai/components/toast/toastConfig/toast';
const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar translucent />
      <RootNavigator />
      <ToastMesssge />
    </NavigationContainer>
  );
};

export default Navigator;
