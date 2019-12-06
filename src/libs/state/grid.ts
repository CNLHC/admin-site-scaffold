import { produce } from 'immer';
import { Reducer } from 'redux';
export type TState = {
  rowSize: number;
  rowHeight: number;
  fillMode: 'width' | 'height' | 'free';
  align: 'left' | 'right' | 'center';
  zoomCoef: number;
};

const initState: TState = {
  rowSize: 5,
  rowHeight: 10,
  fillMode: 'height',
  align: 'left',
  zoomCoef: 1.2,
};

const tag = 'Grid';
export const ActionsEnum = {
  SetGrid: `[${tag}]SetGrid`,
};

export const ACTSetGrid = (data: TState) => ({
  type: ActionsEnum.SetGrid,
  data,
});

export type TAction = ReturnType<typeof ACTSetGrid>;

export const GridSettingReducer: Reducer<TState, TAction> = (
  state = initState,
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionsEnum.SetGrid:
        draft = {
          ...draft,
          ...action.data,
        };
        return draft;
    }
    return draft;
  });
