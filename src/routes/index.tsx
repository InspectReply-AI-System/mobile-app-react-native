import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootStack';
import { navigationRef } from '../utils/navigationUtils';
import ToastMesssge from '@inspectreplyai/components/toast/toastConfig/toast';
import { colors } from '@inspectreplyai/themes';
import crashlytics from '@react-native-firebase/crashlytics';

const Navigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryBlack,
    },
  };

  useEffect(() => {
    crashlytics().log('App loaded.');
  }, []);
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <StatusBar backgroundColor={colors.primaryBlack} translucent />
      <RootNavigator />
      <ToastMesssge />
    </NavigationContainer>
  );
};

export default Navigator;
