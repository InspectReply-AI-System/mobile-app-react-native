import { toFormData } from 'axios';
import { endpoints } from './endpoints';
import { getApiCall, postApiCall } from './networkMethods';
import { setContentType } from './networkServices';

const registerContractor = async (params: { email: string }) => {
  return await postApiCall(endpoints.contractors.register, params);
};

const contractorProfilePhoto = async (params: {
  profilePhoto: string;
  contractor_id: string;
}) => {
  const data = toFormData(params);
  setContentType('multipart/form-data');
  return await postApiCall(endpoints.auth.updateProfilePhoto, data);
};

const getStatesData = async () => {
  return await getApiCall(endpoints.contractors.getStates);
};

const getCategoryData = async () => {
  return await getApiCall(endpoints.contractors.getCategories);
};

const getCitiesData = async (payload: {
  state_code: string;
  state_id: string;
}) => {
  return await postApiCall(endpoints.contractors.getCities, payload);
};

const getContractorslist = async (payload: { page: number; limit: number }) => {
  return await getApiCall(endpoints.contractors.contractors, payload);
};
export {
  getCitiesData,
  getStatesData,
  getCategoryData,
  registerContractor,
  contractorProfilePhoto,
  getContractorslist,
};
