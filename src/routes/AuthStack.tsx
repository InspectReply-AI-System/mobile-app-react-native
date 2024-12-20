import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '@inspectreplyai/modules/Auth/welcome';
import SignUp from '@inspectreplyai/modules/Auth/signUp';
import ROUTES from './routes';
import Login from '@inspectreplyai/modules/Auth/login';
import ForgotPassword from '@inspectreplyai/modules/Auth/forgotPassword';
import VerifyCode from '@inspectreplyai/modules/Auth/verificationCode';
import SetPassword from '@inspectreplyai/modules/Auth/setPassword';

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
      <AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
      <AuthStack.Screen
        name={ROUTES.FORGOTPASSWORD}
        component={ForgotPassword}
      />
      <AuthStack.Screen name={ROUTES.VERIFYCODE} component={VerifyCode} />
      <AuthStack.Screen name={ROUTES.SETPASSWORD} component={SetPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
