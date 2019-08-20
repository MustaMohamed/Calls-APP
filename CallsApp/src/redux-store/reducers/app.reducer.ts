import { appActionsConstants } from '../../constants/redux-store';
import { AppActions, AppState } from '../../types/redux-store';
import { Reducer } from 'redux';

const initialState: AppState = {
  uiLoaderIsActive: false,
  appIsInBackground: false
};

/*
* reducer_name: Reducer<StateType, ActionType> = (state: stateType = initialState, action: ActionType): [reducer_return_type: StateType] => {}
* */

export const appReducer: Reducer<AppState, AppActions> = (state: AppState = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case appActionsConstants.SHOW_APP_LOADER:
      return { ...state, uiLoaderIsActive: action.payload };
    case appActionsConstants.HIDE_APP_LOADER:
      return { ...state, uiLoaderIsActive: action.payload };
    case appActionsConstants.CHANGE_APP_IS_IN_BACKGROUND_STATE:
      return { ...state, appIsInBackground: action.payload };
    default:
      return state;
  }
};
