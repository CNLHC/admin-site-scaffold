import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BasicInfoReducer } from '../state/basic';
import { ReducerState } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const reducer = combineReducers({
  BasicInfoReducer,
});

export type RootState = ReducerState<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const initializeStore = preloadedState => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
