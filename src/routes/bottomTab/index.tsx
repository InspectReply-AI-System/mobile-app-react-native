import React from 'react';

import MyTabBar from './TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomTabs } from './constants';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {bottomTabs.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.name}
            component={_.component}
            options={{
              tabBarLabel: _.label,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
