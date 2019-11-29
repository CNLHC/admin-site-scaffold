import Axios from 'axios';

const Route = `/api/delete_label`;

export const APIDeleteLabel = (payload: Request) => Axios.post(Route, payload);

export interface Request {
  taskid: number;
  baseimg: string;
}
