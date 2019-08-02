import { appActionsConstants } from '../../constants';

export const showUiLoader = () => {
  return {
    type: appActionsConstants.SHOW_APP_LOADER,
    payload: true
  };
};

export const hideUiLoader = () => {
  return {
    type: appActionsConstants.HIDE_APP_LOADER,
    payload: false
  };
};
