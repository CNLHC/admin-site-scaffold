import React from 'react';
import MainLayout from '../components/Layout';
import { withRedux } from '../libs/withRedux';
import 'antd/dist/antd.css';

const Page = () => <MainLayout>1</MainLayout>;

export default withRedux(Page);
