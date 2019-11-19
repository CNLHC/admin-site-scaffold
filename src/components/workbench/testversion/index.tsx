import { Response as TestVersionResponse } from '../../../libs/API/testversion';
import { ColumnProps } from 'antd/lib/table';

type data = TestVersionResponse['data'][0];
type Actions = (props: { record: data }) => JSX.Element;

const getColumns: (Actions: Actions) => ColumnProps<data>[] =(Actions)=> [
  { dataIndex: 'testVersionName', title: '测试版本', key: 'testVersionName',width:"20%",align:"center" },
  { dataIndex: 'product', title: '产品', key: 'product' ,width:"20%",align:"center" },
  { dataIndex: 'createTime', title: '发布时间', key: 'createTime' ,width:"20%",align:"center" },
  {
    dataIndex: 'operations',
    title: '操作',
    key: 'operations',
    render: (_, record) => <Actions record={record} />,
  },
];
export default getColumns;
