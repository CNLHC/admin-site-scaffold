import Axios from 'axios';
import { APIBase } from '../constant/conf';
const Route = `${APIBase}/api/delete_task`;

export interface Request {
  tasks: number[];
  token: string;
}

export const APIDeleteTasks = (p: Request) => Axios.post(Route, p);
