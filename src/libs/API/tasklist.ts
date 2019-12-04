export const Route = `${APIBase}/api/tasklist`
import {APIBase} from "../constant/conf"

export interface Request {
  count: number;
  offset: number;
  taskname: string;
  product: string[];
  version: string[];
  video: string[];
}

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  items: Item[];
  total: number;
}

export interface Item {
  basename: string;
  ftpurl: string;
  locked: boolean;
  productname: string;
  taskid: number;
  taskname: string;
  taskstatus: Taskstatus;
  tasktime: string;
  tasktype: Tasktype;
  taskversion: string;
  videoname: string;
}

export enum Taskstatus {
  Done = 'done',
  LabelWaiting = 'label waiting',
}

export enum Tasktype {
  cap = '抓拍',
  carCap = '车牌抓拍',
  rec = '识别',
  fp = 'fp',
}
