import { ConfigModal, ActionType } from '@inspectreplyai/models/authModel';
import { createSlice } from '@reduxjs/toolkit';

let initialState = new ConfigModal();

const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    SET_CONFIG_DATA: (
      state: ConfigModal = new ConfigModal(),
      action: ActionType,
    ) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    SET_LOADING: (state: ConfigModal = new ConfigModal(), action) => {
      const { payload } = action;
      return { ...state, isLoading: payload };
    },
  },
});
export const { SET_CONFIG_DATA, SET_LOADING } = ConfigSlice.actions;
export default ConfigSlice.reducer;
