import React from 'react';
import ReadNoti from './readNoti';
import UnreadNoti from './unreadNoti';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize } from '@inspectreplyai/utils';
import { CustomTabBar } from '../reports/components/customTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ROUTES from '@inspectreplyai/routes/routes';

const Notifications = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Column style={styles.container}>
      <CustomHeader
        title={CommonStrings.notifications}
        titleCustomStyle={{ fontFamily: fonts.REGULAR }}
      />
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar {...props} customLabelStyle={{ fontWeight: '700' }} />
        )}>
        <Tab.Screen name={ROUTES.UNREAD} component={UnreadNoti} />
        <Tab.Screen name={ROUTES.READ} component={ReadNoti} />
      </Tab.Navigator>
    </Column>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(16),
    backgroundColor: colors.primaryBalck,
  },
});
