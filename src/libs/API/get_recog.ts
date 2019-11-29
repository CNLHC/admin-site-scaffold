import Axios from 'axios';

export const Route = (id: number | string) => `/api/get_recog/${id}`;
export const APIGetRecog = (id: string | number) =>
  Axios.get<Response>(Route(id));

export interface Response {
  code: number;
  data: Data;
}

export type Data = normalData & CarData;

interface normalData {
  id: number;
  items: NormalItem[];
  name: string;
  time: string;
}

interface CarData {
  id: number;
  items: CarItem[];
  name: string;
  nametype: '车牌';
  time: string;
}

enum NameTypeEnum {
  carID = '车牌',
}
export interface NormalItem {
  base: string;
  cap: string;
  label: Label;
  dup?: number;
}

export interface CarItem {
  cap: string;
  exif: string;
  guess: string;
  label: Label;
  dup?: number;
}

export enum Label {
  Right = 'right',
  Wrong = 'wrong',
}
