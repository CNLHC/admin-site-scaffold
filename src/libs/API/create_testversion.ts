import Axios from "axios";
import {APIBase} from "../constant/conf"

export interface Request {
  testVersionName: string;
  product: string;
  createTime: string;
  algorithmVersionName: string;
  firmwareVersionName: string;
  fullPackVersionName: string;
}

const Route = `${APIBase}/api/create_test_version`;

export const APICreateTestVersions = (p: Request) => Axios.post(Route, p);
