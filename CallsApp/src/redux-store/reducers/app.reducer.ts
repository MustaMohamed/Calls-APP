import { appActionsConstants } from '../../constants/redux-store';
import { AppActions, AppState } from '../../types/redux-store';

const initialState: AppState = {
  uiLoaderIsActive: false
};

export const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case appActionsConstants.SHOW_APP_LOADER:
      return { ...state, uiLoaderIsActive: true };
    case appActionsConstants.HIDE_APP_LOADER:
      return { ...state, uiLoaderIsActive: false };
    default:
      return state;
  }
};
