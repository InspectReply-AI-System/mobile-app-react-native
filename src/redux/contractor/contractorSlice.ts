import { createSlice } from '@reduxjs/toolkit';
import { ActionType } from '@inspectreplyai/models/authModel';
import { contractorExtraReducer } from './contractorExtraReducer';

export interface ContractorState {
  error: string;
  loading: boolean;
  states: Array<{
    abbreviation: string;
    capital: string;
    name: string;
    _id: string;
  }>;
  category: Array<{ _id: string; category_name: string }>;
  contractors: Array<any>;
}

let initialState: ContractorState = {
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
