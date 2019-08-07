import { appActionsConstants } from '../../constants';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../store';

export const showUiLoader = (): ThunkAction<void, ApplicationState, null> => {
  return async dispatch => dispatch({
    type: appActionsConstants.SHOW_APP_LOADER,
  });
};

export const hideUiLoader = (): ThunkAction<void, ApplicationState, null> => {
  return dispatch => dispatch({
    type: appActionsConstants.HIDE_APP_LOADER,
  });
};
