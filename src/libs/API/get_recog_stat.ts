import Axios from 'axios';
const Route = '/api/get_recog_stat';

export interface Response {
  code: number;
  data: Datum[];
}

export const APIGetRecogStat = (suc, fai) => {
  Axios.get(Route)
    .then(suc)
    .catch(fai);
};

export interface Datum {
  base: string;
  base_cnt: number | string;
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
