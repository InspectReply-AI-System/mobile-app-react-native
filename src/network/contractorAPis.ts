import { toFormData } from 'axios';
import { endpoints } from './endpoints';
import { postApiCall } from './networkMethods';
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

export { registerContractor, contractorProfilePhoto };
