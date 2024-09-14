import { toFormData } from 'axios';
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
  profilePhoto: string;
  cust_id: string;
}) => {
  const data = toFormData(params);
  setContentType('multipart/form-data');
  return await postApiCall(endpoints.auth.updateProfilePhoto, data);
};

export {
  getUserProfile,
  signInWithEmail,
  registerWithEmail,
  updateProfilePhoto,
  setNewPassword,
  resetPassword,
  verifyOtp,
  updateUserProfile,
};
