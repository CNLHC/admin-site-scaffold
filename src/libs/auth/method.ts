import Axios, { AxiosRequestConfig } from 'axios';

export const AuthPost: typeof Axios.post = (url, data, config) => {
  return Axios.post(url, data, {
    ...config,
    headers: {
      ...(config && config.headers),
      Authorization: sessionStorage.getItem('jwt')
    },
  });
};


export const AuthRequest = (config: AxiosRequestConfig) => Axios.request(
  {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `JWT ${sessionStorage.getItem('jwt')}`
    }
  }
)