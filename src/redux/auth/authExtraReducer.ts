import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getProfile, loginUser, registerUser } from './action';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { AuthState } from './AuthSlice';
import { showErrorToast } from '@inspectreplyai/components/toast';
import { setAuthorizationToken } from '@inspectreplyai/network/networkServices';
import { AuthModel } from '@inspectreplyai/models/authModel';

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
      setTimeout(() => {
        reset(ROUTES.BOTTOMTAB);
      }, 0);
    })
    .addCase(loginUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
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
      setTimeout(() => {
        reset(ROUTES.BOTTOMTAB);
      }, 0);
    })
    .addCase(registerUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload
        ? (action.payload as string)
        : 'An error occurred';
      showErrorToast(action.payload as string);
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
      showErrorToast(action.payload as string);
    });
};
