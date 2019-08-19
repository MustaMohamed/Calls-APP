import { appActionsConstants } from '../../constants/redux-store';
import { AppActions, AppState } from '../../types/redux-store';
import { Reducer } from 'redux';

const initialState: AppState = {
  uiLoaderIsActive: false
};

/*
* reducer_name: Reducer<StateType> = (state: stateType = initialState, action: ActionType): [reducer_return_type: StateType] => {}
* */

export const appReducer: Reducer<AppState> = (state: AppState = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case appActionsConstants.SHOW_APP_LOADER:
      return { ...state, uiLoaderIsActive: action.payload };
    case appActionsConstants.HIDE_APP_LOADER:
      return { ...state, uiLoaderIsActive: action.payload };
    default:
      return state;
  }
};
