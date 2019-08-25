import { authActionsConstants } from '../../../constants/redux-store';
import { AuthState } from '../states';
import { Action } from 'redux';

export interface IsAuthenticated extends Action {
  type: typeof authActionsConstants.USER_IS_AUTHENTICATED;
  payload: AuthState;
}

export interface Login extends Action {
  type: typeof authActionsConstants.USER_LOGIN;
  payload: AuthState;
}

export interface Logout extends Action {
  type: typeof authActionsConstants.USER_LOGOUT;
  payload: AuthState;
}


export type AuthActions = IsAuthenticated | Login | Logout;
