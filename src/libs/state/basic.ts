import { produce } from 'immer';
import { Reducer } from 'redux';

export type TState = {
  products: string[] | undefined;
  videos: string[] | undefined;
};

const initState: TState = {
  products: undefined,
  videos: undefined,
};
const tag = 'Products';
export const ActionsEnum = {
  ACTGetProducts: `[${tag}]ACTGetProducts`,
  ACTGetVideos: `[${tag}]ACTGetVideos`,
};

export const ACTGetProducts = (data: string[]) => ({
  type: ActionsEnum.ACTGetProducts,
  data,
});
export const ACTGetVideos = (data: string[]) => ({
  type: ActionsEnum.ACTGetVideos,
  data,
});

export type TAction = ReturnType<typeof ACTGetProducts>;

export const BasicInfoReducer: Reducer<TState, TAction> = (
  state = initState,
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionsEnum.ACTGetProducts:
        draft.products = action.data;
        return draft;
      case ActionsEnum.ACTGetVideos:
        draft.videos = action.data;
    }
    return draft;
  });
