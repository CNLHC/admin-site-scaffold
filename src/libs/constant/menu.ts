import { TMenuItem } from '../types/menu';

const Menu: TMenuItem[] = [
  {
    title: '任务列表',
    childItem: [],
    key: 'taskList',
    route: 'tasklist',
    icon:'schedule'
  },
  {
    title: '工作台',
    key: 'workbench',
    route: 'workbench',
    icon:'calendar',
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
    icon:"dot-chart",
    route: 'report',
  },
  {
    title: 'QA资源',
    childItem: [],
    key: 'QAResource',
    icon:'file-image',
    route: 'QAResource'
  },
  {
    title: 'Proto解析',
    childItem: [],
    key: 'protoParse',
    icon:'block',
    route: 'protoParse',
  },
];

export default Menu;
