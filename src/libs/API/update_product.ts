export const Route = '/api/update_product';

export interface Request {
  productID: number;
  product: string;
  productType: string;
  factory: string;
}

export interface Response {
  code: number;
  data: string;
}
