import React, { useCallback } from 'react';
import ReadNoti from './readNoti';
import UnreadNoti from './unreadNoti';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize } from '@inspectreplyai/utils';
import { CustomTabBar } from '@inspectreplyai/components/customTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ROUTES from '@inspectreplyai/routes/routes';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getNotification } from '@inspectreplyai/redux/notification/action';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';
import { useFocusEffect } from '@react-navigation/native';

const Notifications = () => {
  const Tab = createMaterialTopTabNavigator();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.AuthSlice);
  const { loading } = useAppSelector((store) => store.NotificationSlice);

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotification({ cust_id: user?.userId }));
    }, []),
  );

  return (
    <>
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
      {loading && <CustomLoader customContainerStyle={styles.loaderStyle} />}
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(16),
    backgroundColor: colors.primaryBlack,
  },
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
