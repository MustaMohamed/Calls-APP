import { authActionsConstants } from '../../../constants/redux-store';
import { AuthState } from '../states';

export interface IsAuthenticated {
  type: typeof authActionsConstants.USER_IS_AUTHENTICATED;
  payload: AuthState;
}

export interface Login {
  type: typeof authActionsConstants.USER_LOGIN;
  payload: AuthState;
}

export interface Logout {
  type: typeof authActionsConstants.USER_LOGOUT;
  payload: AuthState;
}


export type AuthActions = IsAuthenticated | Login | Logout;
