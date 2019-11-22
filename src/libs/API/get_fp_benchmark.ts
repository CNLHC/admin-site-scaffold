import Axios from 'axios';

export const Route = '/api/get_fp_benchmark';

export const APIGetFPBenchmark = (payload, suc, fai) => {
  Axios.post(Route, payload)
    .then(suc)
    .catch(fai);
};

export interface Request {
  taskids: any[];
}

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  basenum: Basenum;
  capturenum: number;
  dacelian: Basenum | number;
  dachelun: Basenum | number;
  dongwulian: Basenum | number;
  fpallnum: Basenum | number;
  hounaoshao: Basenum | number;
  product: string;
  qita: Basenum | number;
  taskid: number;
  taskname: string;
  tasktime: string;
  tasktype: Tasktype;
  taskversion: string;
  videoname: string;
}

export enum Basenum {
  NA = 'N/A',
}

export enum Tasktype {
  FP = 'fp',
}
