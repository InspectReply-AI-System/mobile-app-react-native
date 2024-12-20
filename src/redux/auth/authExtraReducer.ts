import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from './@types';
import { AuthModel } from '@inspectreplyai/models/authModel';
import { getProfile, loginUser, registerUser } from './action';
import { setAuthorizationToken } from '@inspectreplyai/network/networkServices';

export const authExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>,
) => {
  builder
    .addCase(loginUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(loginUser.fulfilled, (state: AuthState, action) => {
      const { customer, token } = action.payload;
      setAuthorizationToken(token);
      state.user.token = token || '';
      state.user.firstName = customer?.first_name || '';
      state.user.lastName = customer?.last_name || '';
      state.user.email = customer?.email || '';
      state.user.userId = customer?._id || '';
      state.user.profilePhoto = customer?.profilePhoto || '';
      state.loading = false;
    })
    .addCase(loginUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });

  builder
    .addCase(registerUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(registerUser.fulfilled, (state: AuthState, action) => {
      const { customer, token } = action.payload;
      setAuthorizationToken(token);
      state.user.token = token || '';
      state.user.firstName = customer?.first_name || '';
      state.user.lastName = customer?.last_name || '';
      state.user.email = customer?.email || '';
      state.user.userId = customer?._id || '';
      state.isSignUp = true;
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });

  builder
    .addCase(getProfile.pending, (state: AuthState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(getProfile.fulfilled, (state: AuthState, action) => {
      const { customer } = action.payload;
      state.user.firstName = customer?.first_name || '';
      state.user.lastName = customer?.last_name || '';
      state.user.email = customer?.email || '';
      state.user.userId = customer?._id || '';
      state.user.base_url = customer?.base_url || '';
      state.user.profilePhoto = customer?.profilePhoto || '';
      state.loading = false;
    })
    .addCase(getProfile.rejected, (state: AuthState, action) => {
      if (action.payload == 'Invalid token') {
        setAuthorizationToken('');
        state.user = new AuthModel();
      }
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
    });
};
