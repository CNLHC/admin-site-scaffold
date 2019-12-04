import Axios from 'axios';
import {APIBase} from "../constant/conf"

const Route = (id: string | number) => `${APIBase}/api/get_relationreview/${id}`;

export const APIGetRelationReview = (id: string | number) =>
  Axios.get<Response>(Route(id));

export interface Response {
  code: number;
  data: Data;
}

export interface Data {
  base_count: number;
  pairs: Pair[];
}

export interface Pair {
  capture: string;
  labelpic: string;
}
