import { showErrorToast } from '@inspectreplyai/components/toast';
import { getNotifications } from '@inspectreplyai/network/notification';
import { createAsyncThunk } from '@reduxjs/toolkit';

const sliceName = 'notifications';

export const getNotification = createAsyncThunk(
  `${sliceName}/getNotifications`,
  async (payload: { cust_id: string }, thunkAPI) => {
    try {
      const response = await getNotifications(payload);
      return response.data;
    } catch (error: any) {
      showErrorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
