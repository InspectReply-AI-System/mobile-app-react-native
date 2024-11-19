import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCategoryData,
  getContractorslist,
  getStatesData,
} from '@inspectreplyai/network/contractorAPis';
import { CommonFunctions } from '@inspectreplyai/utils';
import { showErrorToast } from '@inspectreplyai/components/toast';
const sliceName = 'contractor';

export const getStates = createAsyncThunk(
  `${sliceName}/cities`,

  async (payload, thunkAPI) => {
    try {
      const response = await getStatesData();
      return response.data;
    } catch (error: any) {
      showErrorToast(error);
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
    } catch (error: any) {
      showErrorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getContractors = createAsyncThunk(
  `${sliceName}/contractors`,
  async (
    payload: {
      success(): unknown;
      page?: number;
      limit?: number;
      search?: string;
    },
    thunkAPI,
  ) => {
    const params = {
      ...(payload.page && { page: payload.page }),
      ...(payload.limit && { limit: payload.limit }),
      ...(payload.search && { search: payload.search }),
    };
    try {
      const response = await getContractorslist(params);
      payload?.success();
      return CommonFunctions.convertDataAccodingToFlatList(
        response.data.contractors,
      );
    } catch (error: any) {
      payload?.success();
      showErrorToast(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
