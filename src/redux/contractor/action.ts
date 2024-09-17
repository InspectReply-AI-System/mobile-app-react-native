import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCategoryData,
  getContractorslist,
  getStatesData,
} from '@inspectreplyai/network/contractorAPis';
const sliceName = 'contractor';

export const getStates = createAsyncThunk(
  `${sliceName}/cities`,

  async (payload, thunkAPI) => {
    try {
      const response = await getStatesData();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCategory = createAsyncThunk(
  `${sliceName}/category`,

  async (payload, thunkAPI) => {
    try {
      const response = await getCategoryData();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getContractors = createAsyncThunk(
  `${sliceName}/contractors`,
  async (payload: { page: number; limit: number }, thunkAPI) => {
    try {
      const response = await getContractorslist(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
