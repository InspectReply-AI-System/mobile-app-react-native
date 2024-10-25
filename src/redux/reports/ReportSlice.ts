import { createSlice } from '@reduxjs/toolkit';
import { extraReducer } from './reportsExtraReducer';
import { ReportState } from './@types';

const initialState: ReportState = {
  loading: false,
  error: '',
  recentReports: [],
  sharedReports: [],
  savedReports: [],
};

const ReportSlice = createSlice({
  name: 'Reports',
  initialState,
  reducers: {},
  extraReducers: extraReducer,
});

export default ReportSlice.reducer;
