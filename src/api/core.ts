import axios from 'axios';

interface ApiRequestParams {
  [key: string]: any;
}

export interface ApiResponse<T> {
  code: number;
  result?: T;
  msg?: string;
}

export interface ApiError {
  cod: string | number;
  message: string;
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const request = axios.create({
  timeout: 50000,
  withCredentials: false,
});

export const req = <T>(
  method: Method,
  reqUrl: string,
  params?: ApiRequestParams,
): Promise<ApiResponse<T>> => {
  let _req: any;

  switch(method) {
    case Method.GET:
      _req = request.get;
      break;
    case Method.POST:
      _req = request.post;
      break;
    case Method.PUT:
      _req = request.put;
      break;
    case Method.DELETE:
      _req = request.delete;
      break;
  }

  return new Promise((resolve, reject) => {
    _req(reqUrl, params)
      .then((response: any) => resolve({
        code: 0,
        result: response?.data,
      }))
      .catch((error: any) => reject({
        code: error?.response?.status || -1,
        result: error?.response?.data || {},
        msg: error?.message || 'UNKNOW ERROR',
      }));
  });
};

export const setBodyToUrlParam: (
  url: string,
  body: ApiRequestParams
) => string = (url, body) => {
  try {
    const _url = new URL(url);
    _url.search = new URLSearchParams(body) as any;
    return _url?.href || url;
  } catch (e) {
    console.warn(e);
    return url;
  }
};