import { EditableTableColumnProps } from '../Common/EdiableTable';
import { Response, Route as ProdAPI } from '../../libs/API/versionlist';
import { Input, DatePicker, Select } from 'antd';
import Moment from 'moment';

type Data = Response['data'][0];
const TableInput = <Input />;
const TableTextArea = <Input.TextArea rows={3} />;
const DateTimeInput = <DatePicker />;
const NoneInput = <Input disabled />;

export const GetColumns: (
  p: JSX.Element
) => EditableTableColumnProps<Data>[] = ProductSelect => [
  {
    dataIndex: 'versionName',
    title: '版本号',
    key: 'versionName',
    editable: true,
    inputField: TableInput,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    width: '15%',
  },
  {
    dataIndex: 'product',
    title: '产品',
    key: 'product',
    editable: true,
    inputField: ProductSelect,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    width: '15%',
    align: 'center',
  },
  {
    dataIndex: 'releaseTime',
    title: '发布时间',
    key: 'releaseTime',
    editable: true,
    inputField: DateTimeInput,
    getFieldConf: (record, dataIndex) => ({
      initialValue: Moment(record[dataIndex]),
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    width: '10%',

  },
  {
    dataIndex: 'versionType',
    title: '类型',
    key: 'versionType',
    editable: true,
    inputField: (
      <Select style={{ minWidth: '5em' }}>
        <Select.Option value={'全量包'}>全量包</Select.Option>
        <Select.Option value={'算法'}>算法 </Select.Option>
        <Select.Option value={'固件'}>固件 </Select.Option>
      </Select>
    ),
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    width: '5%',
  },
  {
    dataIndex: 'releaseNote',
    title: '备注',
    key: 'releaseNote',
    editable: true,
    inputField: TableTextArea,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
    width: '12%',
  },
  {
    dataIndex: 'changeLog',
    editable: true,
    title: 'changeLog',
    key: 'changeLog',
    width: '12%',
    inputField: TableTextArea,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
  },
  {
    dataIndex: 'firmwareMD5',
    title: 'MD5',
    key: 'firmwareMD5',
    editable: true,
    inputField: NoneInput,
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),

    ellipsis: true,
    width: '10%',
  },
];
