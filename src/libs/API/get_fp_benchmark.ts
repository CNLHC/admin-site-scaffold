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
  B2R = 'B2R',
  Bp0NVR = 'BP0_NVR',
  Cp3 = 'CP3',
  Empty = '',
  G3 = 'G3',
  Lc = 'LC',
}

export enum Tasktype {
  FP = 'fp',
}

export enum Videoname {
  CatsAndDogsMp4 = 'cats_and_dogs.mp4',
  Lookslikeaface = 'lookslikeaface',
  SjsVideo = 'sjs_video',
  TestFP = 'test_fp',
}
