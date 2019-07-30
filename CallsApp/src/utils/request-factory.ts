import axios, { AxiosRequestConfig } from 'axios';

export default {

  post(endpoint: string, data: {}, headers: {}) {
    return new Promise ((resolve, reject) => {
      axios.post (endpoint, data, headers || {})
        .then ((response) => {
          resolve (response.data);
        })
        .catch ((error) => {
          reject (error);
        });
    });
  },
  get(endpoint: string) {
    return new Promise ((resolve, reject) => {
      axios.get (endpoint)
        .then ((response: any) => {
          resolve (response.data);
        })
        .catch ((error: {}) => {
          reject (error);
        });
    });
  },
  all(ajaxCalls: Promise<any>[]) {
    return new Promise ((resolve, reject) => {
      axios.all (ajaxCalls)
        .then (axios.spread ((acct, perms) => {
          // Both requests are now complete
          resolve (acct);
        })).catch ((error) => {
        reject (error);
      })
    });
  }
};
