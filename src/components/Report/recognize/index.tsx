import { Response as FPStatResponse } from '../../../libs/API/get_recog_stat';
type Data = FPStatResponse['data']['items'][0];
import { ColumnProps } from 'antd/lib/table';

export const GetColumns: () => ColumnProps<Data>[] = () => [
  { dataIndex: 'time', title: '测试时间', key: 'time' },
  { dataIndex: 'name', title: '测试任务', key: 'name' },
  { dataIndex: 'product', title: '产品', key: 'product' },
  { dataIndex: 'version', title: '版本', key: 'version' },
  { dataIndex: 'video', title: '视频', key: 'video' },
  { dataIndex: 'base', title: '底库', key: 'base' },
  { dataIndex: 'base_cnt', title: '底库总数', key: 'base_cnt' },
  { dataIndex: 'stat.recog_cnt', title: '推图总数', key: 'stat.recog_cnt' },
  { dataIndex: 'stat.right_cnt', title: '正识数', key: 'stat.right_cnt' },
  { dataIndex: 'dedup_right_cnt', title: '去重正识数', key: 'dedup_right_cnt' },
  { dataIndex: 'fail_cnt', title: '误识数', key: 'fail_cnt' },
  { dataIndex: 'wrong_rate', title: '误识率', key: 'wrong_rate' },
  { dataIndex: 'vip_recall_rate', title: 'VIP召回率', key: 'vip_recall_rate' },
];
