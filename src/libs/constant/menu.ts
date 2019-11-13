import { TMenuItem } from '../types/menu';

const Menu: TMenuItem[] = [
  {
    title: '任务列表',
    childItem: [],
    key: 'taskList',
    route: 'taskList',
  },
  {
    title: '工作台',
    key: 'workbench',
    route: 'workbench',
    childItem: [
      {
        title: '产品管理',
        childItem: [],
        key: 'productManage',
        route: 'productManage',
      },
      {
        title: '产品版本管理',
        childItem: [],
        key: 'productVersionManage',
        route: 'productVersionManage',
      },
      {
        title: '视频管理',
        childItem: [],
        key: 'taskList',
        route: 'taskList',
      },
      {
        title: '测试版本',
        childItem: [],
        key: 'testVersion',
        route: 'testVersion',
      },
    ],
  },
  {
    title: '分析结果',
    childItem: [],
    key: 'report',
    route: 'report',
  },
  {
    title: 'QA资源',
    childItem: [],
    key: 'QAResource',
    route: 'QAResource',
  },
  {
    title: 'Proto解析',
    childItem: [],
    key: 'protoParse',
    route: 'protoParse',
  },
];

export default Menu;
