export const Route = '/api/filter_testversions'

export interface Request {
  product: string[];
}

export interface Response {
  code: number;
  data: string[];
}
