import React, { useEffect } from 'react';
import MainLayout from '../components/Layout';
import { withRedux } from '../libs/withRedux';
import router from 'next/router';

const Page = props => {
  const auth = props.auth;
  useEffect(() => {
    if (!auth) router.push('/login');
  }, [router]);

  if (!auth) return null;

  return <MainLayout>{1}</MainLayout>;
};

Page.getInitialProps = async function(props) {
  const auth = props.req && props.req.session.auth;
  return { auth };
};

export default withRedux(Page);
