import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProfilePayload,
  LoginUserPayload,
  RegisterUserPayload,
  setProfileImagePayload,
  updateProfilePayload,
} from './@types';
import {
  getUserProfile,
  registerWithEmail,
  signInWithEmail,
  updateProfilePhoto,
  updateUserProfile,
} from '@inspectreplyai/network/authApis';
import { showSuccessToast } from '@inspectreplyai/components/toast';
import { setContentType } from '@inspectreplyai/network/networkServices';
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

export const getProfile = createAsyncThunk(
  `${sliceName}/getProfile`,
  async (payload: getProfilePayload, thunkAPI) => {
    try {
      const response = await getUserProfile(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  `${sliceName}/updateProfile`,
  async (args: updateProfilePayload, thunkAPI) => {
    try {
      const response = await updateUserProfile(args?.payload);
      if (response?.data) {
        thunkAPI.dispatch(getProfile({ customerId: args.customerId }));
        showSuccessToast(response?.data?.message);
        args?.successCallBack(response?.data);
      }
      return response.data;
    } catch (error: any) {
      args?.errorCallBack(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const setProfileImage = createAsyncThunk(
  `${sliceName}/setProfileImage`,
  async (args: setProfileImagePayload, thunkAPI) => {
    try {
      const response = await updateProfilePhoto(args?.profilePayload);
      if (response?.data) {
        setContentType(null);
        thunkAPI.dispatch(getProfile({ customerId: args.customerId }));
        showSuccessToast(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
