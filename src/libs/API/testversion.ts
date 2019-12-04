import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = `${APIBase}/api/testversion_list`;

export const APIListTestVersion = (suc, fai) => {
  Axios.get(Route)
    .then(suc)
    .catch(fai);
};

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  algorithmName: string;
  createTime: string;
  firmwareName: string;
  fullPackName: string;
  product: string;
  testVersionID: number;
  testVersionName: string;
}
