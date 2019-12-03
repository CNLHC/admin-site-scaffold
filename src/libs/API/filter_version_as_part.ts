import Axios from 'axios';

const Route = '/api/filter_version_as_part';
export const  APIFilterVersionPart= (p: Request) => Axios.post<Response>(Route, p);

export interface Request {
  product: string;
}

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  algorithm: any[];
  firmware: any[];
  fullpack: string[];
}
