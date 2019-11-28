import Axios from 'axios';

const Route = (id: string | number) => `/api/get_relationsdk/${id}`;

export const APIGetRelationalSDK = (id: string | number) =>
  Axios.get<Response>(Route(id));

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  basenum: number;
  taskID: number;
  taskInfo: TaskInfo[];
}

export interface TaskInfo {
  basePic: string;
  labelPic: LabelPic[];
}

export interface LabelPic {
  capPic: string;
  score: number;
}
