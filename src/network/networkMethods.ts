import { $http } from './networkServices';

/**
 * Generic API call function
 * @param method HTTP method (post, put, get, patch, delete)
 * @param endPoint endpoint of the API
 * @param data request payload or parameters
 * @param config additional axios config options (optional)
 */
const apiCall = async (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  endPoint: string,
  data?: object,
  config = {},
) => {
  return await $http[method](endPoint, data, config);
};

const postApiCall = (endPoint: string, params: object) =>
  apiCall('post', endPoint, params);
const putApiCall = (endPoint: string, params?: object) =>
  apiCall('put', endPoint, params);
const getApiCall = (endPoint: string, params?: object) =>
  apiCall('get', endPoint, { params });
const patchApiCall = (endPoint: string, params?: object) =>
  apiCall('patch', endPoint, params);
const deleteApiCall = (endPoint: string, paramsData = '', requestBody = {}) => {
  const requestConfig = { data: requestBody };
  return apiCall('delete', endPoint + paramsData, requestConfig);
};

export { postApiCall, deleteApiCall, patchApiCall, getApiCall, putApiCall };
