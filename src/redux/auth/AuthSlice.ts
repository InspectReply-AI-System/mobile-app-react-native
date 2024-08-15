import { createSlice } from '@reduxjs/toolkit';
import { authExtraReducer } from './authExtraReducer';
import { ActionType, AuthModal } from '@inspectreplyai/models/authModal';

let initialState = new AuthModal();

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    SET_DATA: (state: AuthModal = new AuthModal(), action: ActionType) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
  extraReducers: authExtraReducer,
});
export const { SET_DATA } = AuthSlice.actions;
export default AuthSlice.reducer;
