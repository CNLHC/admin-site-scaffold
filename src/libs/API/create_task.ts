import { APIBase } from '../constant/conf';
import Axios from 'axios';

const Route = `${APIBase}/api/create_task`;

export const APICreateTask = fd =>
  Axios.post(Route, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
