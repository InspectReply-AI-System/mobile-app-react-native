import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { NotificationItem, NotificationState } from './@types';
import { getNotification } from './action';

export const notificationExtraReducer = (
  builder: ActionReducerMapBuilder<NotificationState>,
) => {
  builder
    .addCase(getNotification.pending, (state: NotificationState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getNotification.fulfilled, (state: NotificationState, action) => {
      const readData = action?.payload?.filter(
        (item: NotificationItem) => item.status === 1,
      );
      const unreadData = action?.payload?.filter(
        (item: NotificationItem) => item.status === 0,
      );
      state.readNotis = readData;
      state.unreadNotis = unreadData;
      state.loading = false;
    })

    .addCase(getNotification.rejected, (state: NotificationState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });
};
