import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserPayload, RegisterUserPayload } from './@types';
import {
  registerWithEmail,
  signInWithEmail,
} from '@inspectreplyai/network/authApis';
const sliceName = 'auth';

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,

  async (payload: LoginUserPayload, thunkAPI) => {
    try {
      const response = await signInWithEmail(payload);
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
