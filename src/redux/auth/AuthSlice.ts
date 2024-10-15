import { createSlice } from '@reduxjs/toolkit';
import { authExtraReducer } from './authExtraReducer';
import { AuthModel, ActionType } from '@inspectreplyai/models/authModel';

export interface AuthState {
  error: string;
  loading: boolean;
  isSignUp: boolean;
  user: AuthModel;
}

const initialState: AuthState = {
  error: '',
  loading: false,
  isSignUp: false,
  user: new AuthModel(),
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    SET_DATA: (state, action: ActionType) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
  extraReducers: authExtraReducer,
});
export const { SET_DATA } = AuthSlice.actions;
export default AuthSlice.reducer;
