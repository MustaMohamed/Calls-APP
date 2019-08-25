import { appActionsConstants, authActionsConstants } from '../../constants';
import { userLogin, isEmpty, userLogout } from '../../services';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Dispatch } from 'redux';
import { AuthActions, AuthState, AuthUser, UserLogin } from '../../types';
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
    const isAuthenticated = true;
    let authUser = null;
    if (isAuthenticated) {
      authUser = {};
    }
    dispatch({
      type: authActionsConstants.USER_IS_AUTHENTICATED,
      payload: { isAuthenticated, user: authUser }
    });
  };
};

export const logoutAction: ActionCreator<AuthThunkAction> = (user: AuthUser, isLeaveLogout: boolean): AuthThunkAction => {
  return async (dispatch: Dispatch) => {
    try {

      if (isLeaveLogout) {
        await dispatch(endAgentShiftAction(user));
      }
      await userLogout(user, isLeaveLogout);
      dispatch({
        type: authActionsConstants.USER_LOGOUT,
        payload: { isAuthenticated: false, user: null }
      });
    } catch (e) {

    }
  };
};

export const loginAction: ActionCreator<AuthThunkAction> = (user: UserLogin = {}): AuthThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const authUser = await userLogin(user);
      const isAuthenticated = !isEmpty(authUser);
      if (isAuthenticated) {
        dispatch({
          type: authActionsConstants.USER_LOGIN,
          payload: { isAuthenticated, user: authUser }
        });
      } else {
        dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
      }
    } catch (e) {

      dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
    } finally {
    }
  }
};
