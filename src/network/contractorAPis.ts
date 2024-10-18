import { endpoints } from './endpoints';
import { getApiCall, postApiCall } from './networkMethods';
import { setContentType } from './networkServices';

const registerContractor = async (params: { email: string }) => {
  return await postApiCall(endpoints.contractors.register, params);
};

const updateContractorProfile = async (params: { email: string }) => {
  return await postApiCall(
    endpoints.contractors.updateContractorProfile,
    params,
  );
};

const contractorProfilePhoto = async (params: {
  profileDetails: {
    path?: string;
    name?: string;
    type?: string;
    mime?: string;
    filename?: string;
  };
  contractor_id: string;
}) => {
  const data = new FormData();

  data.append('profilePhoto', {
    uri: params?.profileDetails?.path,
    type: 'image/jpeg',
    name: 'profile-photo.jpg',
  } as any);

  data.append('contractor_id', params?.contractor_id);
  setContentType('multipart/form-data');
  return await postApiCall(endpoints.contractors.contractorProfilePhoto, data);
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

const getContractorProfile = async (payload: { contractor_id: string }) => {
  const url = `${endpoints.contractors.contractorProfile}/${payload.contractor_id}`;
  return await getApiCall(url);
};

const deleteContractor = async (payload: { contractor_id: string }) => {
  return await postApiCall(endpoints.contractors.deleteContractor, payload);
};

const preferredContractor = async (payload: { cust_id: string }) => {
  return await postApiCall(endpoints.contractors.preferredContractor, payload);
};

export {
  getCitiesData,
  getStatesData,
  getCategoryData,
  registerContractor,
  contractorProfilePhoto,
  getContractorslist,
  getContractorProfile,
  updateContractorProfile,
  deleteContractor,
  preferredContractor,
};
