import Axios from 'axios';

export const AuthPost: typeof Axios.post = (url, data, config) => {
  return Axios.post(url, data, {
    ...config,
    headers: { ...(config&&config.headers), auth: sessionStorage.getItem('jwt') },
  });
};
