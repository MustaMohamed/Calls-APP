import { appActionsConstants } from '../../constants';
import { ActionCreator } from 'redux';
import { AppActions } from '../../types/redux-store/actions';

/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
* */
export const showUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: appActionsConstants.SHOW_APP_LOADER,
    payload: true,
  };
};

export const hideUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: appActionsConstants.HIDE_APP_LOADER,
    payload: false,
  };
};
