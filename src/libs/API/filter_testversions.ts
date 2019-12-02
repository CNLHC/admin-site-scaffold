import Axios from 'axios';

export const Route = '/api/filter_testversions';

export const APIFilterTestVersion = (payload: Request) =>
  Axios.post<Response>(Route, payload);

export interface Request {
  product: string[];
}

export interface Response {
  code: number;
  data: string[];
}
