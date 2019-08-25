import API from './api';
import { HTTPResponse } from '../types';

export default {

  post(endpoint: string, data: {} = {}, headers: {} = {}): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
      API.post(endpoint, data, { headers })
        .then((response) => {
          resolve({
            hasError: false,
            data: response.data,
            status: {
              code: response.status,
              text: response.statusText
            }
          } as HTTPResponse);
        })
        .catch((error) => {
          reject({
            hasError: true,
            error: error,
            data: error.response.data,
            status: {
              code: error.response.status,
              text: error.response.request._response
            }
          } as HTTPResponse);
        });
    });
  },
  put(endpoint: string, data: {} = {}, headers: {} = {}): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
      API.put(endpoint, data, { headers })
        .then((response) => {
          resolve({
            hasError: false,
            data: response.data,
            status: {
              code: response.status,
              text: response.statusText
            }
          } as HTTPResponse);
        })
        .catch((error) => {
          reject({
            hasError: true,
            error: error,
            data: error.response.data,
            status: {
              code: error.response.status,
              text: error.response.request._response
            }
          } as HTTPResponse);
        });
    });
  },
  get(endpoint: string, params: {} = {}, headers: {} = {}): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
      API.get(endpoint, { params: params, headers })
        .then((response: any) => {
          resolve({
            hasError: false,
            data: response.data,
            status: {
              code: response.status,
              text: response.statusText
            }
          } as HTTPResponse);
        })
        .catch((error: {}) => {
          reject({
            hasError: true,
            error: error,
            data: error.response.data,
            status: {
              code: error.response.status,
              text: error.response.request._response
            }
          } as HTTPResponse);
        });
    });
  },
  all(ajaxCalls: Promise<any>[]): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
      API.all(ajaxCalls)
        .then(API.spread((acct, perms) => {
          // Both requests are now complete
          resolve(acct);
        })).catch((error) => {
        reject(error);
      })
    });
  }
};
