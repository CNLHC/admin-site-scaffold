import Axios from 'axios';
import { APIBase } from '../constant/conf';

const Route = `${APIBase}/api/create_version`;

export const APICreateVersions = (p: FormData) =>
  Axios.post(Route, p, { headers: { 'Content-Type': 'multipart/form-data' } });
