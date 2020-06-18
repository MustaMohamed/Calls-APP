import { AuthState, AuthActions } from '../../types/redux-store';
import { authActionsConstants } from '../../constants/redux-store/actions';
import { Reducer } from 'redux';
import { AuthUser } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: AuthUser
};
/*
* reducer_name: Reducer<StateType, ActionType> = (state: stateType = initialState, action: ActionType): [reducer_return_type: StateType] => {}
* */
export const authReducer: Reducer<AuthState, AuthActions> = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case authActionsConstants.USER_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user };
    case authActionsConstants.USER_LOGIN:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user };
    case authActionsConstants.USER_LOGOUT:
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user };
    default:
      return state;
  }
};
