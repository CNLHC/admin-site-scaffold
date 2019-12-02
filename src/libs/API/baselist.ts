import Axios from 'axios';

const Route = '/api/baselist';

export const APIBaseList = (payload: Request) =>
  Axios.post<Response>(Route, payload);
export interface Request {
  videoname: string;
  basetype: string;
}

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  baseDir: string;
  baseName: string;
  baseNum: number;
  baseType: string;
}
