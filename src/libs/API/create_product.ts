import Axios from 'axios';
import { ProductType } from './productlist';

export const Route = '/api/create_product';

export const APICreateProduct = (p: Request) => Axios.post(Route, p);
export interface Request {
  product: string;
  productType: ProductType;
  factory: string;
}

export interface Response {
  code: number;
  data: string;
}
