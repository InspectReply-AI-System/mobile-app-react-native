import { endpoints } from '@inspectreplyai/network/endpoints';
import { postApiCall } from '@inspectreplyai/network/networkMethods';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserPayload, RegisterUserPayload } from './@types';
import { registerWithEmail } from '@inspectreplyai/network/authApis';
const sliceName = 'auth';

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async ({ email, password }: LoginUserPayload, thunkAPI) => {
    try {
      const response = await postApiCall(endpoints.auth.login, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async (payload: RegisterUserPayload, thunkAPI) => {
    try {
      const response = await registerWithEmail(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
