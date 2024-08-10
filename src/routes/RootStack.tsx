import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <RootStack.Screen
        component={() => {
          return <></>;
        }}
        name={'Home'}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
