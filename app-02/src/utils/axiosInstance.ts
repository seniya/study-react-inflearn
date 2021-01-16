import axios, { AxiosInstance } from 'axios';

export function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function (config) {
      // axios.defaults.headers.common.Authorization = localStorage.getItem('token')
      config.headers.Authorization = localStorage.getItem('TOKEN') || null;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      console.log(`${response.config.url}`, response);
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  return instance;
}

const apiRootPath = 'http://localhost:3000';

function createInstance() {
  const instance: AxiosInstance = axios.create({
    baseURL: apiRootPath,
  });
  return setInterceptors(instance);
}

export const axiosInstance = createInstance();
