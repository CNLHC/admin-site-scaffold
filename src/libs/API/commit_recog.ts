import Axios from 'axios';
import {APIBase} from "../constant/conf"
import { Label } from './get_recog';

const Route = `${APIBase}/api/commit_recog`;
export const APICommitRecog = (payload: Request) => Axios.post(Route, payload);

export interface Request {
  taskid: string;
  items: Item[];
}

export interface Item {
  base: string;
  cap: string;
  label: Label;
  dup?: number;
}
