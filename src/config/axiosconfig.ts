import rootAxios from 'axios';
import Qs from 'qs';
import Config from 'react-native-config';

const createAxiosInstance = () =>
  rootAxios.create({
    baseURL: Config.BASE_URL,
    paramsSerializer: params =>
      Qs.stringify(params, { arrayFormat: 'brackets' }),
  });

export default createAxiosInstance;
