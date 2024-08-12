import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '@inspectreplyai/modules/Auth/welcome';
import SignUp from '@inspectreplyai/modules/Auth/signUp';
import ROUTES from './routes';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <AuthStack.Screen name={ROUTES.WELCOME} component={Welcome} />
      <AuthStack.Screen name={ROUTES.SIGNUP} component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
