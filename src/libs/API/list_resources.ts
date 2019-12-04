import Axios from 'axios';
import {APIBase} from "../constant/conf"

const Route = `${APIBase}/api/list_resource`;

export const APIListResources = (p: Request) => Axios.post(Route, p);

export interface Request {
  name: string;
  type: string;
}

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  fullpath: string;
  id: number;
  name: string;
  note: string;
  path: string;
  size: string;
  type: Type;
}

export enum Type {
  底库 = '底库',
}
