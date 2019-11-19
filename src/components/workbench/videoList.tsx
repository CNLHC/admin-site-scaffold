import { EditableTableColumnProps } from '../Common/EdiableTable';
import { Response } from '../../libs/API/videolist';
import { Input, DatePicker, Select } from 'antd';
import Moment from 'moment';

type Data = Response['data'][0];
const TableInput = <Input />;
const TableTextArea = <Input.TextArea rows={3} />;
const DateTimeInput = <DatePicker />;
const NoneInput = <Input disabled />;

export const GetColumns: () => EditableTableColumnProps<Data>[] = () => [
  {
    dataIndex: 'videoName',
    title: '视频',
    key: 'videoName',
    width: '10%',
    ellipsis: true,
    inputField: TableInput,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    editable: true,
  },
  {
    dataIndex: 'defaultBaseName',
    title: '默认底库',
    key: 'defaultBaseName',
    width: '10%',
    ellipsis: true,
  },
  { dataIndex: 'videoType', title: '视频类型', key: 'videoType' },
  { dataIndex: 'videoSize', title: '视频大小', key: 'videoSize' },
  { dataIndex: 'lengthOfTime', title: '视频时长', key: 'lengthOfTime' },
  { dataIndex: 'videoThreshold', title: '阈值', key: 'videoThreshold' },
  {
    dataIndex: 'singleFrameConcurrency',
    title: '单帧并发',
    key: 'singleFrameConcurrency',
  },
  {
    dataIndex: 'peakPedestrianDensity',
    title: '峰值密度',
    key: 'peakPedestrianDensity',
  },
  { dataIndex: 'scene', title: '场景', key: 'scene' },
  { dataIndex: 'maxPeople', title: '最大通过人数', key: 'maxPeople' },
  { dataIndex: 'singlePassTime', title: '单人通行时间', key: 'singlePassTime' },
];
