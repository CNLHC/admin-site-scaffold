import Axios from 'axios';
import {APIBase} from "../constant/conf"

const Route = (id: number | string) => `${APIBase}/api/filtercapture/${id}`;

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  capture: string[];
}

export const APIFilterCapture = id => Axios.get<Response>(Route(id));
