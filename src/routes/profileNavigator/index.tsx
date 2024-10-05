import React from 'react';
import ROUTES from '../routes';
import Profile from '@inspectreplyai/modules/profile';
import Password from '@inspectreplyai/modules/profile/password';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <ProfileStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <ProfileStack.Screen name={ROUTES.PASSWORDSCREEN} component={Password} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
