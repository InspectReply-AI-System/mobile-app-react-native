import { Keyboard } from 'react-native';
import { $http } from './networkServices';

/**
 * post api call common function
 * @param endPoint endpoint of api
 * @param params data to send

 */

const postApiCall = async (endPoint: string, params: object) => {
  try {
    const response: any = await $http.post(endPoint, params);
    console.log('postApiCall', response);
    return response.data;
  } catch (error: any) {
    console.log('postApiCall', error);
    throw new Error(error.message);
  }
};

/**
 * put api call common function
 * @param endPoint endpoint of api
 * @param params data to send
 */
const putApiCall = async (endPoint: string, params?: object) => {
  try {
    const response = await $http.put(endPoint, params);
    console.log('responseputApiCall', response);
    return response;
  } catch (error: any) {
    console.log('responseputApiCall error', error);
    throw new Error(error?.message || 'Some thing wrong');
  }
};

/**
 * get api call common function
 * @param endPoint endpoint of api
 * @param paramsData data to send
 */
const getApiCall = async (endPoint: string, body: any = {}) => {
  try {
    const response = await $http.get(endPoint, { params: body });
    console.log('getapi', response);
    return response?.data;
  } catch (error: any) {
    console.log('getapi error', error);
    throw new Error(error?.message);
  }
};

/**
 * patch api call common function
 * @param endPoint endpoint of api
 * @param params data to send

 */
const patchApiCall = async (endPoint: string, params?: object) => {
  try {
    const result = await $http.patch(endPoint, params);
    console.log('for chat response', result);
    return result;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

/**
 * delete api call common function
 * @param endPoint endpoint of api
 * @param paramsData data to send
 */
const deleteApiCall = async (
  endPoint: string,
  paramsData = '',
  requestBody = {},
) => {
  try {
    const requestConfig = {
      data: requestBody, // Data for the request body
    };
    const result = await $http.delete(endPoint + paramsData, requestConfig);
    return result;
  } catch (error: any) {
    Keyboard.dismiss();
    throw new Error(error?.message);
  }
};

export { postApiCall, deleteApiCall, patchApiCall, getApiCall, putApiCall };
