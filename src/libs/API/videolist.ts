import Axios from 'axios';

export const Route = '/api/videolist';

export const APIListVideo = (suc, fai) => {
  Axios.get(Route)
    .then(suc)
    .catch(fai);
};

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  defaultBaseName: string;
  lengthOfTime: string;
  maxPeople: number;
  peakPedestrianDensity: number;
  scene: string;
  singleFrameConcurrency: number;
  singlePassTime: number;
  videoID: number;
  videoName: string;
  videoSize: string;
  videoThreshold: number;
  videoType: VideoType;
}

export enum VideoType {
  FP = 'fp',
  抓拍 = '抓拍',
}
