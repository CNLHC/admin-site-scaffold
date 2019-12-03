import { TMenuItem } from '../types/menu';

const Menu: TMenuItem[] = [
  {
    title: '任务列表',
    childItem: [],
    key: 'taskList',
    route: 'tasklist',
    icon: 'schedule',
  },
  {
    title: '工作台',
    key: 'workbench',
    route: 'workbench',
    icon: 'calendar',
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
        key: 'videoManage',
        route: 'videoManage',
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
    childItem: [
      {
        title: '抓拍',
        childItem: [],
        key: 'ReportCapture',
        icon: 'camera',
        route: 'capture',
      },
      {
        title: 'fp',
        childItem: [],
        key: 'ReportFP',
        icon: 'car',
        route: 'fp',
      },
      {
        title: '识别',
        childItem: [],
        key: 'ReportRecognize',
        icon: 'eye',
        route: 'Recognize',
      },
    ],
    key: 'report',
    icon: 'dot-chart',
    route: 'report',
  },
  {
    title: '创建任务',
    key: 'createTask',
    icon: 'edit',
    route: '',
    childItem: [
      {
        title: 'FP/抓拍任务',
        key: 'createTaskFPCAP',
        route: '',
        childItem: [],
      },
      {
        title: '识别任务',
        key: 'createRecog',
        route: '',
        childItem: [],
      },
    ],
  },
  {
    title: 'QA资源',
    childItem: [],
    key: 'QAResource',
    icon: 'file-image',
    route: 'QAResource',
  },
];

export default Menu;
