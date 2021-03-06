import React, { useCallback, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Router from 'next/router';
import MainLayout from '../components/Layout';
import { CSRAuthStateCtx, setAuthState } from './auth/state';
import { AuthRequest } from './auth/method';

export const withAuthCheck = PageComponent => {
  const Wrapper = (props: any) => {
    const [auth, setAuth] = useState<undefined | boolean>(undefined);
    const getState = useContext(CSRAuthStateCtx);
    const authState = getState();

    const checkAuth = useCallback(jwt => {
      AuthRequest({
        data:{token:sessionStorage.getItem("jwt")},
        url: 'api/auth/verify',
        method: "POST"
      })
        .then(() => {
          setAuthState(true);
          return setAuth(true);
        })
        .catch(() => {
          setAuthState(false);
          setAuth(false);
          Router.push('/login');
        });
    }, []);

    useEffect(() => checkAuth(sessionStorage.getItem('jwt')), []);

    const PageLoading = authState ? <MainLayout></MainLayout> : null;
    const Page403 = authState ? <MainLayout> 403</MainLayout> : <p>403</p>;

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
