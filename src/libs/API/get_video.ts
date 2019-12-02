import Axios from 'axios';

export const Route = '/api/get_video';

export const APIGetVideo = () => Axios.get<Response>(Route);

export interface Response {
  code: number;
  data: string[];
}

export type Request = {};
