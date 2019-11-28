import Axios from 'axios';

export const Route = (id: number) => `/api/filter_allcapture/${id}`;
export const APIGetAllCapture = (id: number) => {
  return Axios.get(Route(id));
};


export interface Response {
    code: number;
    data: Datum[];
}

export interface Datum {
    capimg: string;
    tag:    number;
}
