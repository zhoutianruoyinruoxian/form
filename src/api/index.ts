import axiosCreator from './config/axiosCreator';
import apilist, { ApiList } from './api';
import { defaultOption, ReturnDataType } from './config/axiosConfig';

const api = axiosCreator<ApiList, ReturnDataType>(apilist, defaultOption);
export default api;