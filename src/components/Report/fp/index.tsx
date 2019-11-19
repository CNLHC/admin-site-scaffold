import { Response } from '../../../libs/API/get_fp_benchmark';
import Table, {
  ColumnProps,
  PaginationConfig,
  TableProps,
} from 'antd/lib/table';

type Data = Response['data'][0];

export const GetColumns: () => ColumnProps<Data>[] = () => [
  { dataIndex: 'taskname', title: '任务名称', key: 'taskname' },
  { dataIndex: 'product', title: '产品', key: 'product' },

  { dataIndex: 'taskversion', title: '测试版本', key: 'taskversion' },
  { dataIndex: 'capturenum', title: '图片总数', key: 'capturenum' },
  { dataIndex: 'dacelian', title: '大侧脸', key: 'dacelian' },

  { dataIndex: 'dachelun', title: '大车轮', key: 'dachelun' },
  { dataIndex: 'dongwulian', title: '动物脸', key: 'dongwulian' },
  { dataIndex: 'qita', title: '其他', key: 'qita' },
  { dataIndex: 'fpallnum', title: 'FP总数', key: 'fpallnum' },
];
