import Axios from 'axios';
import {APIBase} from "../constant/conf"

const Route = `${APIBase}/api/delete_label`;

export const APIDeleteLabel = (payload: Request) => Axios.post(Route, payload);

export interface Request {
  taskid: number;
  baseimg: string;
}
