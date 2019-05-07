import axios, { AxiosRequestConfig } from 'axios';
import isPlainObject from 'lodash-es/isPlainObject';
import { didRequest, didRequestError } from './axiosConfig';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface Api<Y> {
  [apiName: string]: (params?: object, option?: AxiosRequestConfig) => Promise<Y>;
}
type AxiosCreator = <T, Y>(apiList: T, defaultOption: AxiosRequestConfig, customGlobalParams?: object) => Api<Y>;

const isJsonFormat = (method: Method) => ['PUT', 'POST', 'PATCH'].findIndex(x => x === method) > -1;

const axiosCreator: AxiosCreator = <T, Y>(apiList: T, defaultOption: AxiosRequestConfig, customGlobalParams?: object) => {
  let api: Api<Y> = {};
  const instance = axios.create(defaultOption);
  // instance.interceptors.request.use(function (config) {
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });
  instance.interceptors.response.use(didRequest as any, didRequestError);
  Object.keys(apiList).forEach(o => {
    api[o] = (params, option) => {
      let opts: AxiosRequestConfig = Object.assign({}, apiList[o], option);
      if (isJsonFormat((opts.method.toUpperCase() as Method))) {
        if (!isPlainObject(params)) {
          opts.data = params;
        } else {
          opts.data = Object.assign({}, customGlobalParams, params);
        }
      } else {
        opts.params = Object.assign({}, customGlobalParams, params);
      }
      return instance(opts) as any;
    };
  });
  return api;
}

export default axiosCreator;
