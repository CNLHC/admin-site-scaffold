export const Route = '/api/create_product';

export interface Request {
  product: string;
  productType: string;
  factory: string;
}

export interface REsponse {
  code: number;
  data: string;
}
