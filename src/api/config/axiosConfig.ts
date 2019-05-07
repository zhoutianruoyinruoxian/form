import { message } from 'antd';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import api from '../index';

export interface ReturnDataType {
  code: string;
  message: string;
  result: any;
}

interface DefaultOption extends AxiosRequestConfig {
  errorHandling: boolean
}
export const defaultOption: DefaultOption = {
  timeout: 10000,
  errorHandling: true,
  validateStatus(status: number) {
    return (status >= 200 && status < 300) || status === 304; // 默认的
  },
  headers: { 'token': localStorage.token || '' }
};

export const didRequest = (res: AxiosResponse<ReturnDataType>) => {
  // 200 and type = ok
  if ((res.status >= 200 && res.status < 300) && (res.data.code === '0')) {
    return res.data;
  }

  if (res.status === 203) {
    toLogin();
    return Promise.reject(res);
  }

  if (res.data.code === '403') {
    noPermission();
    return Promise.reject(res);
  }
  // show error
  message.error(res.data.message, 6);
  return Promise.reject(res);
};

export function didRequestError(error: AxiosError) {
  const { config } = error;
  const res = error.response;
  if ((config as DefaultOption).errorHandling === false) {
    return error;
  }

  let msg = error.message;
  if (error.message.match(/timeout/)) {
    msg = '请求超时';
  } else if (res && res.data && (res.data.data || res.data.detail)) {
    msg = res.data.data || res.data.detail;
  } else {
    msg = '网络错误，请检查您的网络，稍后再试';
  }
  message.error(msg);
  return Promise.reject(error);
}

function toLogin() {
  api.login({ returnUrl: location.href }).then(res => {
    location.href = res.result;
  })
}

function noPermission() {
  location.href = '/NoPermission';
}
