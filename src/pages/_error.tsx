import React from 'react';
import Error from 'next/error';
import MainLayout from '../components/Layout';

const Page = ({ statusCode }) => {
  if (statusCode) {
    return (
      <MainLayout>
        <Error statusCode={statusCode} />
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Error statusCode={404} />
    </MainLayout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default Page;
