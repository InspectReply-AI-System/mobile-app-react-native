import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ReportState } from './@types';
import { getFavoriteReport, getRecentReport, getSharedReport } from './action';

export const extraReducer = (builder: ActionReducerMapBuilder<ReportState>) => {
  builder
    .addCase(getRecentReport.pending, (state: ReportState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getRecentReport.fulfilled, (state: ReportState, action) => {
      state.recentReports = action.payload.reports || [];
      state.loading = false;
    })
    .addCase(getRecentReport.rejected, (state: ReportState, action) => {
      state.loading = false;
      state.recentReports = [];
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });
  builder
    .addCase(getFavoriteReport.pending, (state: ReportState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getFavoriteReport.fulfilled, (state: ReportState, action) => {
      state.savedReports = action.payload.reports || [];
      state.loading = false;
    })
    .addCase(getFavoriteReport.rejected, (state: ReportState, action) => {
      state.loading = false;
      state.savedReports = [];
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });

  builder
    .addCase(getSharedReport.pending, (state: ReportState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getSharedReport.fulfilled, (state: ReportState, action) => {
      state.sharedReports = action.payload.reports || [];
      state.loading = false;
    })
    .addCase(getSharedReport.rejected, (state: ReportState, action) => {
      state.loading = false;
      state.sharedReports = [];
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });
};
