import Axios from 'axios';

const Route = '/api/create_version';

export const APICreateVersions = (p: FormData) =>
  Axios({
    method: 'post',
    url: Route,
    data: p,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

