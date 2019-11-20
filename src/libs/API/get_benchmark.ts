import Axios from 'axios';

export const Route = '/api/get_benchmark';

export const APIGetBenchmark = (payload: Request, suc, fai) => {
  Axios.post(Route, payload)
    .then(suc)
    .catch(fai);
};

export interface Request {
  taskid: any[];
  count: number;
  offset: number;
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
  basenum: number;
  caprate: number | string;
  capturenum: number;
  duenum: number | string;
  duerate: number | string;
  eftfacenum: number | string;
  fpnum: number | string;
  fprate: number | string;
  missnum: number | string;
  product: Product;
  taskid: number;
  taskname: string;
  tasktime: string;
  tasktype: Tasktype;
  taskversion: Taskversion;
  videoname: Videoname;
}

export enum Product {
  B2R = 'B2R',
}

export enum Tasktype {
  抓拍 = '抓拍',
  车牌抓拍 = '车牌抓拍',
}

export enum Taskversion {
  // eslint-disable-next-line
  B2RFW2019_1117_RCImg = 'B2R_FW_2019_1117_RC.img',
}

export enum Videoname {
  // eslint-disable-next-line
  CarlicenseXiaoquH264 = 'carlicense_xiaoqu.h264',
  Low = 'low',
}