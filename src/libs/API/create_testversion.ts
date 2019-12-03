import Axios from "axios";

export interface Request {
  testVersionName: string;
  product: string;
  createTime: string;
  algorithmVersionName: string;
  firmwareVersionName: string;
  fullPackVersionName: string;
}

const Route = '/api/create_test_version';

export const APICreateTestVersions = (p: Request) => Axios.post(Route, p);
