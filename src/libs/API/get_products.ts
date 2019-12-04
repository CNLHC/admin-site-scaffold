import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = `${APIBase}/api/get_products`;

export const APIGetProducts = () => Axios.get<Response>(Route);
export interface Response {
  code: number;
  data: string[];
}

export type Request = {};
