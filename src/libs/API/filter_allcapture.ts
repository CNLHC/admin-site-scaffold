import Axios from 'axios';
import {APIBase} from "../constant/conf"

export const Route = (id: number|string) => `${APIBase}/api/filter_allcapture/${id}`;
export const APIGetAllCapture = (id: number|string) => {
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
