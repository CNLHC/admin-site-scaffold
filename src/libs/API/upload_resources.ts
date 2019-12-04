import { APIBase } from '../constant/conf';
import Axios from 'axios';

const Route = `${APIBase}/api/upload_resource`;

export const APIUploadResource = fd =>
  Axios.post(Route, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
