import React from 'react';
import App from 'next/app';
import 'antd/dist/antd.css';
import { CSRAuthStateCtx, getAuthState } from '../libs/auth/state';
import { initializeStore } from '../libs/store';
import { Provider } from 'react-redux';
let __authState = false;
let reduxStore;

const getOrInitializeStore = ()=> {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore();
  }
  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore();
  }
  return reduxStore;
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const store = getOrInitializeStore();
    return (
      <Provider store={store}>
      <CSRAuthStateCtx.Provider value={getAuthState}>
        <Component {...pageProps} />;
      </CSRAuthStateCtx.Provider>
    </Provider>
    );
  }
}

export default MyApp;
