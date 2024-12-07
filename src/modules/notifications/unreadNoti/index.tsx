import React from 'react';
import NotiCard from '../notiCard';
import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { FlatList, StyleSheet } from 'react-native';
import Column from '@inspectreplyai/components/general/Column';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import moment from 'moment';
import { NotiItem } from '../@types';
import { postApiCall } from '@inspectreplyai/network/networkMethods';
import { endpoints } from '@inspectreplyai/network/endpoints';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { getNotification } from '@inspectreplyai/redux/notification/action';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import EmptyListCard from '../emptyListCard';

const UnreadNoti = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.AuthSlice);
  const { unreadNotis } = useAppSelector((store) => store.NotificationSlice);

  const handleDelete = async (id: string) => {
    try {
      const response = await postApiCall(
        endpoints.notification.deleteNotification,
        { notification_id: id },
      );
      dispatch(getNotification({ cust_id: user?.userId }));
      showSuccessToast(response?.data?.message);
    } catch (error: any) {
      showErrorToast(error);
    }
  };
  const onPressNotiCard = async (_id: string) => {
    try {
      const response = await postApiCall(
        endpoints.notification.markNotificationRead,
        {
          notification_id: _id,
        },
      );
      if (response?.status == 200) {
        navigate(ROUTES.REPORTSUMMARY);
      }
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const _renderItem = ({ item }: NotiItem) => {
    return (
      <>
        <NotiCard
          heading={item?.content}
          onRightIconPress={() => {}}
          onPressCard={() => onPressNotiCard(item?._id)}
          onActionPress={() => handleDelete(item?._id)}
          subLabel={moment(item?.createdAt).fromNow()}
        />
      </>
    );
  };

  return (
    <Column style={styles.container}>
      <FlatList
        data={unreadNotis}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: normalize(20) },
          unreadNotis?.length <= 0 ? { flex: 1 } : {},
        ]}
        ItemSeparatorComponent={() => <Column style={{ marginTop: 8 }} />}
        keyExtractor={(item) => item?._id}
        ListEmptyComponent={() => <EmptyListCard />}
      />
    </Column>
  );
};

export default UnreadNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
});
