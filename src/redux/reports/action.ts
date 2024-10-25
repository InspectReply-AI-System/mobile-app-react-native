import {
  favoriteReports,
  recentReports,
  sharedReports,
} from '@inspectreplyai/network/reportsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetReportsPayload } from './@types';

const sliceName = 'reports';

const getRecentReport = createAsyncThunk(
  `${sliceName}/getRecentReport`,
  async (payload: GetReportsPayload, thunkAPI) => {
    try {
      const response = await recentReports(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const getSharedReport = createAsyncThunk(
  `${sliceName}/getSharedReport`,
  async (payload: GetReportsPayload, thunkAPI) => {
    try {
      const response = await sharedReports(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const getFavoriteReport = createAsyncThunk(
  `${sliceName}/getFavoriteReport`,
  async (payload: GetReportsPayload, thunkAPI) => {
    try {
      const response = await favoriteReports(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export { getRecentReport, getSharedReport, getFavoriteReport };
