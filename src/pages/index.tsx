import React, { useEffect } from 'react';
import MainLayout from '../components/Layout';
import { withRedux } from '../libs/withRedux';
import router from 'next/router';
import { withAuthCheck } from '../libs/withCSRAuth';

const Page = props => {
  return <MainLayout>{1}</MainLayout>;
};

export default withAuthCheck(withRedux(Page));
