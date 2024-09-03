import { endpoints } from './endpoints';
import { postApiCall } from './networkMethods';

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

export {
  signInWithEmail,
  registerWithEmail,
  setNewPassword,
  resetPassword,
  verifyOtp,
};
