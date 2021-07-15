import {AxiosInstance, AxiosRequestConfig} from 'axios';

const setHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const {headers} = config;
  // headers['Access-Control-Allow-Origin'] = '*';

  headers['Content-Type'] = 'application/json';

  return config;
};

const configInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use(async config => {
    return setHeaders(config);
  });

  axios.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    error => {
      // Do something with response error
      if (!error.response) {
        console.log('Error if....');
        return Promise.reject(error);
      } else {
        console.log('Error else......', error.response);
        const data = {message: 'No Record found'};
        const errorMessage = (error.response.data = data);

        return error.response;
      }
    },
  );
};

export default configInterceptors;
