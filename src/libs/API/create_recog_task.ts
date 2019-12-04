import { APIBase } from '../constant/conf';
import Axios from 'axios';

const Route = `${APIBase}/api/create_recog_task`;

export const APICreateRecogTask = fd =>
  Axios.post(Route, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
