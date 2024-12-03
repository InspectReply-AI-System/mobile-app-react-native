import React from 'react';
import NotiCard from '../notiCard';
import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { StyleSheet, FlatList } from 'react-native';
import Column from '@inspectreplyai/components/general/Column';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { NotiItem } from '../@types';
import moment from 'moment';
import { postApiCall } from '@inspectreplyai/network/networkMethods';
import { endpoints } from '@inspectreplyai/network/endpoints';
import { getNotification } from '@inspectreplyai/redux/notification/action';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';

const ReadNoti = () => {
  const { readNotis } = useAppSelector((store) => store.NotificationSlice);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.AuthSlice);

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

  const onPressNotiCard = () => {
    navigate(ROUTES.REPORTSUMMARY);
  };

  const _renderItem = ({ item }: NotiItem) => {
    return (
      <>
        <NotiCard
          heading={item?.content}
          onRightIconPress={() => {}}
          onPressCard={onPressNotiCard}
          onActionPress={() => handleDelete(item?._id)}
          subLabel={moment(item?.createdAt).fromNow()}
        />
      </>
    );
  };

  return (
    <Column style={styles.container}>
      <FlatList
        data={readNotis}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: normalize(20) }}
        ItemSeparatorComponent={() => <Column style={{ marginTop: 8 }} />}
      />
    </Column>
  );
};

export default ReadNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
});
