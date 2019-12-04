import Axios from 'axios';
import {APIBase} from "../constant/conf"
const Route = `${APIBase}/api/get_recog_stat`;

export interface Request {
  count: number;
  offset: number;
}

export const APIGetRecogStat = (p: Request) => Axios.post<Response>(Route, p);

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  items: Item[];
  total: number;
}

export interface Item {
  base: string;
  base_cnt: number;
  name: string;
  product: string;
  stat: Stat;
  time: string;
  version: string;
  video: string;
}

export interface Stat {
  dedup_right_cnt: number;
  fail_cnt: number;
  recog_cnt: number;
  right_cnt: number;
  vip_recall_rate: string;
  wrong_cnt: number;
  wrong_rate: string;
}
