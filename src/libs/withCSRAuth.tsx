import React, { useCallback, useState, useEffect } from 'react';
import Axios from 'axios';
import Router from 'next/router';
import MainLayout from '../components/Layout';

export const withAuthCheck = PageComponent => {
  const Wrapper = (props: any) => {
    const [auth, setAuth] = useState<undefined | boolean>(undefined);
    const checkAuth = useCallback(jwt => {
      console.log("check")
      Axios.post(
        '/_auth/check',
        {},
        {
          headers: {
            auth: jwt,
          },
        }
      )
        .then(() => setAuth(true))
        .catch(() => {
          setAuth(false);
          Router.push('/login');
        });
    }, []);

    useEffect(() => checkAuth(sessionStorage.getItem('jwt')), []);

    const PageLoading = <MainLayout> Loading</MainLayout>;
    const Page403 = <MainLayout> 403</MainLayout>;

    switch (auth) {
      case undefined:
        return PageLoading;
      case true:
        return <PageComponent {...props} />;
      case false:
        return Page403;
    }
  };
  return Wrapper;
};
