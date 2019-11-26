import React from 'react';

let __authState = false;

export const setAuthState = (state: boolean) => (__authState = state);
export const getAuthState = () => __authState;

export const CSRAuthStateCtx = React.createContext<() => boolean>(
  () => __authState
);
