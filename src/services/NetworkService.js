/* eslint-disable prettier/prettier */
import axios from 'axios';
import { appConfig } from '@config/appConfig';
import { log } from '@utils/log';
const defaultHeader = {};

const appClient = axios.create({
    baseURL: appConfig.baseAPIUrl,
    timeout: 0,
    headers: defaultHeader,
});
appClient.defaults.timeout = 0;

appClient.interceptors.request.use( async function(config) {
  log('Starting Request', config);
  return config;
});

appClient.interceptors.response.use(
  function(response) {
    log('response', response);
    return response;
  },
  function(error) {
    log('Request Failed:', error.config);
    return Promise.reject(error.response || error.message);
  }
);

export { appClient };
