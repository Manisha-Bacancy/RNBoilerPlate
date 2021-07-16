import rootAxios from 'axios';
import Qs from 'qs';
import Config from 'react-native-config';

// const Domain = {
//   Live: 'https://jsonplaceholder.typicode.com/',
//   Staging: 'https://staging.com/',
// };
// export const BASE_URL = Domain.Staging;
export const BASE_URL = Config.BASE_URL;

const createAxiosInstance = () =>
  rootAxios.create({
    baseURL: BASE_URL,
    paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'brackets'}),
  });

export default createAxiosInstance;
