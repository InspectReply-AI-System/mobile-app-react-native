import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@inspectreplyai/modules/splash';
import ROUTES from './routes';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}>
      <RootStack.Screen component={Splash} name={ROUTES.SPLASH} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
