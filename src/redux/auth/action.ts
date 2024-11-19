import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteUserPayload,
  getProfilePayload,
  LoginUserPayload,
  RegisterUserPayload,
  setProfileImagePayload,
  updateProfilePayload,
} from './@types';
import {
  deleteUserProfile,
  getUserProfile,
  registerWithEmail,
  signInWithEmail,
  updateProfilePhoto,
  updateUserProfile,
} from '@inspectreplyai/network/authApis';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { setContentType } from '@inspectreplyai/network/networkServices';
import { SET_CONFIG_DATA } from '../config/ConfigSlice';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
const sliceName = 'auth';

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,

  async (payload: LoginUserPayload, thunkAPI) => {
    try {
      const response = await signInWithEmail(payload);
      thunkAPI.dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));

      setTimeout(() => {
        reset(ROUTES.BOTTOMTAB);
      }, 0);
      return response.data;
    } catch (error: any) {
      showErrorToast(error);

      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async (payload: RegisterUserPayload, thunkAPI) => {
    try {
      const response = await registerWithEmail(payload);
      thunkAPI.dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));

      setTimeout(() => {
        reset(ROUTES.BOTTOMTAB);
      }, 0);
      return response.data;
    } catch (error: any) {
      showErrorToast(error);

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
    } catch (error: any) {
      showErrorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  `${sliceName}/updateProfile`,
  async (args: updateProfilePayload, thunkAPI) => {
    setContentType(null);
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
      }
      return response.data;
    } catch (error: any) {
      showErrorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  `${sliceName}/deleteUser`,
  async (args: deleteUserPayload, thunkAPI) => {
    try {
      const response = await deleteUserProfile({ cust_id: args?.cust_id });
      if (response?.data) {
        args?.successCallBack(response?.data);
      }
      return response.data;
    } catch (error) {
      args?.errorCallBack(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
