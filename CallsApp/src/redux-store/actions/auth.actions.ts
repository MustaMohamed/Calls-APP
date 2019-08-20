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
import { ActionCreator, Dispatch } from 'redux';
import { AuthActions, AuthState } from '../../types/redux-store';
import { endAgentShiftAction, getAgentStatusAction } from './agent.actions';
/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
*
* // thunk action
*
* action_name: ActionCreator<ThunkAction<return_type, stateType, null, ActionsType>> = (): [action_return_type: ThunkAction<return_type, stateType, null, ActionsType>] => {}
*
* */

type AuthThunkAction = ThunkAction<Promise<any>, AuthState, null, AuthActions>;

export const checkAuthenticationAction: ActionCreator<AuthThunkAction> = (): AuthThunkAction => {
  return async (dispatch: Dispatch) => {
    const isAuthenticated = await checkAuthenticationService();
    let authUser = null;
    if (isAuthenticated) {
      authUser = await getAuthentication();
    }
    dispatch({
      type: authActionsConstants.USER_IS_AUTHENTICATED,
      payload: { isAuthenticated, user: authUser }
    });
  };
};

export const logoutAction: ActionCreator<AuthThunkAction> = (): AuthThunkAction => {
  return async (dispatch: Dispatch) => {
    await userLogout();
    await dispatch(endAgentShiftAction());
    dispatch({
      type: authActionsConstants.USER_LOGOUT,
      payload: { isAuthenticated: false, user: null }
    });
  };
};

export const loginAction: ActionCreator<AuthThunkAction> = (user: {} = {}): AuthThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const authUser = await userLogin(user);
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
