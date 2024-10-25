import { createSlice } from '@reduxjs/toolkit';
import { ActionType } from '@inspectreplyai/models/authModel';
import { contractorExtraReducer } from './contractorExtraReducer';
import { ContractorState } from './@types';

const initialState: ContractorState = {
  error: '',
  loading: false,
  states: [],
  category: [],
  contractors: [],
};

const ContracotrSlice = createSlice({
  name: 'contractor',
  initialState,
  reducers: {
    SET_DATA: (state, action: ActionType) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
  extraReducers: contractorExtraReducer,
});
export const { SET_DATA } = ContracotrSlice.actions;
export default ContracotrSlice.reducer;
