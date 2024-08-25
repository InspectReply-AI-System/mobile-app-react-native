import { AuthModel } from '@inspectreplyai/models/authModel';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './action';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonFunctions } from '@inspectreplyai/utils';

export const authExtraReducer = (
  builder: ActionReducerMapBuilder<AuthModel>,
) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      const { customer, token } = action.payload;
      state.user.token = token;
      state.user.firstName = customer?.first_name;
      state.user.lastName = customer?.last_name;
      state.user.email = customer?.email;
      state.user.userId = customer?._id;
      state.loading = false;
      reset(ROUTES.BOTTOMTAB);
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      CommonFunctions.showSnackbar(action?.payload);
    });

  builder
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user.token = action.payload; // TO DO NOT RECIEVE TOKEN IN SIGN UP
      reset(ROUTES.BOTTOMTAB);
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      CommonFunctions.showSnackbar(action?.payload);
    });
};
