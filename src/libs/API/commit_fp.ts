import Axios from 'axios';

export const Route = (id: number | string) => `/api/commit_fp/${id}`;

export const APICommitFP = (payload: Request, id: string | number) =>
  Axios.post(Route(id), payload);

export interface Request {
  FP: FP[];
}

export interface FP {
  capimg: string;
  tag: number;
}
