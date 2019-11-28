const Route = (id: number | string) => `/api/filtercapture/${id}`;

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  capture: string[];
}
