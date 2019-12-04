import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = `${APIBase}/api/filter_testversions`;

export const APIFilterTestVersion = (payload: Request) =>
  Axios.post<Response>(Route, payload);

export interface Request {
  product: string[];
}

export interface Response {
  code: number;
  data: string[];
}
