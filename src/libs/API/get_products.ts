import Axios from 'axios';

export const Route = '/api/get_products';

export const APIGetProducts = () => Axios.get<Response>(Route);
export interface Response {
  code: number;
  data: string[];
}

export type Request = {};
