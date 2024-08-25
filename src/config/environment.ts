import { apiConfig } from './api';

// src/config/environment.js
const ENV = {
  dev: {
    API_URL: apiConfig.BASE_URL,
    DEBUG_MODE: true,
  },
  prod: {
    API_URL: apiConfig.BASE_URL,
    DEBUG_MODE: false,
  },
};

const getEnvVars = (env = 'dev') => {
  // Ensure 'prod' or 'dev' is passed in as environment
  if (env === 'prod') return ENV.prod;
  return ENV.dev;
};

export default getEnvVars(process.env.NODE_ENV);
