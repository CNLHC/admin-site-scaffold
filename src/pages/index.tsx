import React, { useEffect } from 'react';
import MainLayout from '../components/Layout';
import { useRouter } from 'next/router';
import { withAuthCheck } from '../libs/withCSRAuth';

const Page = props => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/tasklist');
  }, []);

  return <MainLayout>{}</MainLayout>;
};

export default  withAuthCheck(Page);
