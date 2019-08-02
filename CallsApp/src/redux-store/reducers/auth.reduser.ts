import {  AuthState, AuthActions } from '../../types/redux-store';
import { authActionsConstants } from '../../constants/redux-store/actions';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {}
};

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case authActionsConstants.USER_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuthenticated };
    case authActionsConstants.USER_LOGIN:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user };
    case authActionsConstants.USER_LOGOUT:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: {} };
    default:
      return state;
  }
};
