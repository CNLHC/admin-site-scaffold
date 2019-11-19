export const Route = '/api/versionlist';

export interface Response {
  code: number;
  data: Datum[];
}

export interface Datum {
  changeLog: string;
  firmwareMD5: string;
  product: string;
  releaseNote: ReleaseNote;
  releaseTime: string;
  versionID: number;
  versionName: string;
  versionType: VersionType;
}

export enum ReleaseNote {
  Empty = '',
  ReleaseNote = ' ',
  升级包无效 = '升级包无效',
  固件0928 = '固件0928',
  固件更新 = '固件更新',
  算法更新 = '算法更新',
}

export enum VersionType {
  全量包 = '全量包',
  固件 = '固件',
  算法 = '算法',
}
