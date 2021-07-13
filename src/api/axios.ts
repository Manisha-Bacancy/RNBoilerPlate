import createAxiosInstance from '../config/axiosconfig';
import configInterceptors from './interceptor';

const axios = createAxiosInstance();

configInterceptors(axios);

export default axios;