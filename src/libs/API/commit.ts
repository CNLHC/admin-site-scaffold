import Axios from 'axios';
import {APIBase} from "../constant/conf"

const Route = `${APIBase}/api/commit`;

export const APICommit = (payload: Request) => Axios.post(Route, payload);

export interface Request {
  taskid: string;
  baseimg: string;
  capimg: string;
}
