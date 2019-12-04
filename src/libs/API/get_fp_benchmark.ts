import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = `${APIBase}/api/get_fp_benchmark`;

export const APIGetFPBenchmark = (payload: Request) =>
  Axios.post<Response>(Route, payload);

export interface Request {
  count: number;
  offset: number;
  taskids: any[];
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
  basenum: Basenum;
  capturenum: number;
  dacelian: Basenum | number;
  dachelun: Basenum | number;
  dongwulian: Basenum | number;
  fpallnum: Basenum | number;
  hounaoshao: Basenum | number;
  product: Product;
  qita: Basenum | number;
  taskid: number;
  taskname: string;
  tasktime: string;
  tasktype: Tasktype;
  taskversion: string;
  videoname: Videoname;
}

export enum Basenum {
  NA = 'N/A',
}

export enum Product {
  C3S = 'C3S',
  Cp3 = 'CP3',
  G3 = 'G3',
}

export enum Tasktype {
  FP = 'fp',
}

export enum Videoname {
  TestFP = 'test_fp',
}
