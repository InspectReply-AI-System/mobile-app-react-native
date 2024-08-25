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

export { signInWithEmail, registerWithEmail };
