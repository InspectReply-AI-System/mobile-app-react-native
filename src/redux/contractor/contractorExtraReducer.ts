import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { getCategory, getContractors, getStates } from './action';
import { showErrorToast } from '@inspectreplyai/components/toast';
import { ContractorState } from './@types';

export const contractorExtraReducer = (
  builder: ActionReducerMapBuilder<ContractorState>,
) => {
  builder
    .addCase(getStates.pending, (state: ContractorState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getStates.fulfilled, (state: ContractorState, action) => {
      state.states = action.payload || [];
      state.loading = false;
    })

    .addCase(getStates.rejected, (state: ContractorState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
    });

  builder
    .addCase(getCategory.pending, (state: ContractorState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getCategory.fulfilled, (state: ContractorState, action) => {
      state.category = action.payload || [];
      state.loading = false;
    })

    .addCase(getCategory.rejected, (state: ContractorState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
    });

  builder
    .addCase(getContractors.pending, (state: ContractorState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getContractors.fulfilled, (state: ContractorState, action) => {
      state.contractors = action.payload || [];
      state.loading = false;
    })

    .addCase(getContractors.rejected, (state: ContractorState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
    });
};
