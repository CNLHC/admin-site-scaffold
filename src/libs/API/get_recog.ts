import Axios from 'axios';

export const Route = (id: number | string) => `/api/get_recog/${id}`;
export const APIGetRecog = (id: string | number) =>
  Axios.get<Response>(Route(id));

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  id: number;
  items: Item[];
  name: string;
  time: string;
}

export interface Item {
  base: string;
  cap: string;
  label: Label;
  dup?: number;
}

export enum Label {
  Right = 'right',
  Wrong = 'wrong',
}
