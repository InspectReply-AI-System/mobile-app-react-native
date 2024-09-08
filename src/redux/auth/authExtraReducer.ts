import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './action';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonFunctions } from '@inspectreplyai/utils';
import { AuthState } from './AuthSlice';

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
      state.user.token = token || '';
      state.user.firstName = customer?.first_name || '';
      state.user.lastName = customer?.last_name || '';
      state.user.email = customer?.email || '';
      state.user.userId = customer?._id || '';
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
      CommonFunctions.showSnackbar(action.payload as string);
    });

  builder
    .addCase(registerUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(registerUser.fulfilled, (state: AuthState, action) => {
      const { customer, token } = action.payload;
      state.user.token = token || '';
      state.user.firstName = customer?.first_name || '';
      state.user.lastName = customer?.last_name || '';
      state.user.email = customer?.email || '';
      state.user.userId = customer?._id || '';
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
      CommonFunctions.showSnackbar(action.payload as string);
    });
};
