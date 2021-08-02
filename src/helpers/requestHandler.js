/* eslint-disable no-undef */
import axios from 'axios';

// import { polyfill } from 'es6-promise';
// polyfill();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  // timeout: 100000
});

axiosInstance.interceptors.request.use(request => {
  return request;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

async function requestHandler(settings) {
  
  if (typeof settings.actions.start === 'function') {
    settings.actions.start();
  }
  
  let axiosConfig = {
    method: settings.method,
    url: settings.url,
    data: settings.requestData
  };

  runRequest(axiosConfig);

  async function runRequest(config) {
    try {
      const response = await axiosInstance(config);
      if (typeof settings.actions.success === 'function') {
        settings.actions.success(response.data);
      }
    } catch (error) {
      
      // Request timeout has expired

      if (error.code && error.code === 'ECONNABORTED') {
        settings.actions.fail('Server doesn\'t respond, problem with Internet connection');
        return;
      }

      // Errors

      if (error.response) {
        if (typeof settings.actions.fail === 'function') {
          console.log('Request error:', error);
          settings.actions.fail(error);
        } else {
          console.log('Request error:', error);
        }
      }
    }
  }
}

export default requestHandler;