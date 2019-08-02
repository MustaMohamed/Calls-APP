import { authActionsConstants } from '../../constants';

export const checkAuthentication = () => {
  return {
    type: authActionsConstants.USER_IS_AUTHENTICATED,
    payload: { isAuthenticated: true }
  };
};

export const logout = () => {
  return {
    type: authActionsConstants.USER_LOGOUT,
    payload: { isAuthenticated: false, user: {} }
  };
};

export const login = (user: {} = {}) => {
  return {
    type: authActionsConstants.USER_LOGIN,
    payload: { isAuthenticated: true, user }
  };
};

