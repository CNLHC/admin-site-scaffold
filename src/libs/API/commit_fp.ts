import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = (id: number | string) => `${APIBase}/api/commit_fp/${id}`;

export const APICommitFP = (payload: Request, id: string | number) =>
  Axios.post(Route(id), payload);

export interface Request {
  FP: FP[];
}

export interface FP {
  capimg: string;
  tag: number;
}
