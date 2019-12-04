import Axios from 'axios';
import {APIBase} from "../constant/conf"
import { useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { ACTGetVideos } from '../state/basic';

export const Route = `${APIBase}/api/get_video`;

export const APIGetVideo = () => Axios.get<Response>(Route);

export const useAPIGetVideo = async (cb: (e) => void) => {
  const videos = useTypedSelector(e => e.BasicInfoReducer.videos);
  const dispatch = useDispatch();
  if (videos) return videos;

  const res = await APIGetVideo();
  dispatch(ACTGetVideos(res.data.data));
  return res.data.data;
};

export interface Response {
  code: number;
  data: string[];
}

export type Request = {};
