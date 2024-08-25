import { createSlice } from '@reduxjs/toolkit';
import { authExtraReducer } from './authExtraReducer';
import { AuthModel, ActionType } from '@inspectreplyai/models/authModel';

let initialState = new AuthModel();

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    SET_DATA: (state: AuthModel = new AuthModel(), action: ActionType) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
  extraReducers: authExtraReducer,
});
export const { SET_DATA } = AuthSlice.actions;
export default AuthSlice.reducer;
