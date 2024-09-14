import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiConfig } from '../config';

const $http: AxiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

$http.interceptors.request.use(async (config: any) => {
  if (config.headers) {
    /* empty */
  }
  return config;
});

/**
 * check error message from response and show message according to screen
 */
$http.interceptors.response.use(
  (response: any) => {
    console.debug(
      `%c[Post-Fetch] Response from ${response.config.url}`,
      'color: white; background: green;',
      response,
    );
    return response;
  },
  (error: any) => {
    const originalConfig = error.config as AxiosRequestConfig;
    console.debug(
      `%c[Error] ${originalConfig.method?.toUpperCase()} request to ${
        originalConfig.url
      }`,
      'color: white; background: red;',
      error,
    );
    handleApiError(error?.response?.status?.toString());
    console.log('API Response Error:', error.response, error?.code);
    return Promise.reject(
      error?.response?.data?.msg ||
        error?.response?.data?.message ||
        'Something went wrong',
    );
  },
);

const handleApiError = (errorMessage: string) => {
  console.log('handleApiError', errorMessage);
};

const setAuthorizationToken = (token: string) => {
  console.log('token in the setAuthorizationToken', token);
  if (token) {
    $http.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

const setContentType = (contentType: string | null) => {
  if (contentType) {
    $http.defaults.headers['Content-Type'] = contentType;
  } else {
    $http.defaults.headers['Content-Type'] = 'application/json';
  }
};

export { $http, handleApiError, setAuthorizationToken, setContentType };
