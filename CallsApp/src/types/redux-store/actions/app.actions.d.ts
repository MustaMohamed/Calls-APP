import { appActionsConstants } from '../../../constants/redux-store';

export interface ShowUiLoaderAction {
  type: typeof appActionsConstants.SHOW_APP_LOADER;
  payload: boolean;
}

export interface HideUiLoaderAction {
  type: typeof appActionsConstants.HIDE_APP_LOADER;
  payload: boolean;
}

export type AppActions = ShowUiLoaderAction | HideUiLoaderAction;
