import { createSlice } from '@reduxjs/toolkit';
import { NotificationState } from './@types';
import { notificationExtraReducer } from './notificationExtraReducer';

const initialState: NotificationState = {
  error: '',
  loading: false,
  unreadNotis: [],
  readNotis: [],
};

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {},
  extraReducers: notificationExtraReducer,
});

export default NotificationSlice.reducer;
