import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ReportState } from './@types';
import { getFavoriteReport, getRecentReport, getSharedReport } from './action';
import { showErrorToast } from '@inspectreplyai/components/toast';

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
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
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
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
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
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
    });
};
