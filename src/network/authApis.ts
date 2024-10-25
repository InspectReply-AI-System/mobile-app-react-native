import { endpoints } from './endpoints';
import { getApiCall, postApiCall } from './networkMethods';
import { setContentType } from './networkServices';

const signInWithEmail = async (params: { email: string; password: string }) => {
  return await postApiCall(endpoints.auth.login, params);
};

const registerWithEmail = async (params: {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  status: number;
}) => {
  return await postApiCall(endpoints.auth.register, params);
};

const setNewPassword = async (params: {
  email: string;
  newPassword: string;
}) => {
  return await postApiCall(endpoints.auth.setNewPassword, params);
};

const verifyOtp = async (params: { email: string; otp: string }) => {
  return await postApiCall(endpoints.auth.verifyOtp, params);
};
const resetPassword = async (params: { email: string }) => {
  return await postApiCall(endpoints.auth.forgotPassword, params);
};

const getUserProfile = async (params: { customerId: string }) => {
  return await getApiCall(
    `${endpoints.auth.getUserProfile}${params?.customerId}`,
  );
};

const updateUserProfile = async (params: {
  cust_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: number;
}) => {
  return await postApiCall(endpoints.auth.updateUserProfile, params);
};

const updateProfilePhoto = async (params: {
  profilePhoto: { uri: string; type: string; name: string };
  cust_id: string;
}) => {
  const data = new FormData();
  data.append('profilePhoto', {
    uri: params?.profilePhoto?.uri,
    type: params?.profilePhoto?.type,
    name: params?.profilePhoto?.name,
  } as any);

  data.append('cust_id', params?.cust_id);
  setContentType('multipart/form-data');
  return await postApiCall(endpoints.auth.updateProfilePhoto, data);
};

const deleteUserProfile = async (params: { cust_id: string }) => {
  return await postApiCall(endpoints.auth.deleteUser, params);
};

const changeUserPassword = async (params: {
  cust_id: string;
  oldPassword: string;
  newPassword: string;
}) => {
  return await postApiCall(endpoints.auth.changePassword, params);
};

export {
  getUserProfile,
  signInWithEmail,
  registerWithEmail,
  deleteUserProfile,
  updateProfilePhoto,
  changeUserPassword,
  setNewPassword,
  resetPassword,
  verifyOtp,
  updateUserProfile,
};
