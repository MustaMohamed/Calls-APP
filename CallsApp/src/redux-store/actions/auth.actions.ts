import { appActionsConstants, authActionsConstants } from '../../constants';
import {
  userLogin,
  checkAuthentication as checkAuthenticationService,
  isEmpty,
  saveAuthentication,
  getAuthentication,
  userLogout
} from '../../services';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../store';

export const checkAuthentication = (): ThunkAction<void, ApplicationState, null> => {
  return async dispatch => {
    const isAuthenticated = await checkAuthenticationService();
    let authUser = null;
    if (isAuthenticated) {
      authUser = await getAuthentication();
    }
    console.log(isAuthenticated, authUser);
    dispatch({
      type: authActionsConstants.USER_IS_AUTHENTICATED,
      payload: { isAuthenticated, user: authUser }
    });
  };
};

export const logout = (): ThunkAction<void, ApplicationState, null> => {
  return async dispatch => {
    await userLogout();
    dispatch({
      type: authActionsConstants.USER_LOGOUT,
      payload: { isAuthenticated: false, user: null }
    });
  };
};

export const login = (user: {} = {}): ThunkAction<void, ApplicationState, null> => {
  return async dispatch => {
    try {
      const { results } = await userLogin(user);
      const authUser = results[0];
      const isAuthenticated = !isEmpty(authUser);
      await saveAuthentication(authUser);
      dispatch({
        type: authActionsConstants.USER_LOGIN,
        payload: { isAuthenticated, user: authUser }
      });
    } catch (e) {
      dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
    }
  }
};
