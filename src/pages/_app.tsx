import React from 'react';
import App from 'next/app';
import 'antd/dist/antd.css';
import { CSRAuthStateCtx, getAuthState } from '../libs/auth/state';
let __authState = false;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CSRAuthStateCtx.Provider value={getAuthState}>
        <Component {...pageProps} />;
      </CSRAuthStateCtx.Provider>
    );
  }
}

export default MyApp;
