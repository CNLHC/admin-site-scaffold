import Axios from 'axios';

const Route = '/api/commit';

export const APICommit = (payload: Request) => Axios.post(Route, payload);

export interface Request {
  taskid: number;
  baseimg: string;
  capimg: string;
}
