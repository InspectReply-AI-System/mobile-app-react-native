import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootStack';
import { navigationRef } from '../utils/navigationUtils';
import ToastMesssge from '@inspectreplyai/components/toast/toastConfig/toast';
import { colors } from '@inspectreplyai/themes';

const Navigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryBalck,
    },
  };
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <StatusBar translucent />
      <RootNavigator />
      <ToastMesssge />
    </NavigationContainer>
  );
};

export default Navigator;
