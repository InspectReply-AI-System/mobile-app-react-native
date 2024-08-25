import { postApiCall } from './networkMethods';

const signInWithEmail = async (data: any) => {
  try {
    const response = await postApiCall('endpoints', data);
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export { signInWithEmail };
