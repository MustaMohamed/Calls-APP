import requestFactory from '../utils/request-factory';
import { AuthUser, HTTPResponse, UserLogin, UserResponse } from '../types';

export const userLogin: Function = async (user: UserLogin): Promise<AuthUser> => {
  try {
    const response: HTTPResponse = await requestFactory.post('login', user, {});

    const userResponse: UserResponse = response.data;
    return {
      id: userResponse.user.id,
      name: userResponse.user.name,
      username: userResponse.user.username,
      email: userResponse.user.email,
      branchId: userResponse.user.branch_id,
      token: userResponse.token,
    };
  } catch (e) {
    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('Please check your username and password!');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    }
  }
};

export const userLogout = async (user: AuthUser, isLeave: boolean) => {
  try {

    if (user) {
      await requestFactory.get('logout', { is_leave: isLeave }, {
        Authorization: `Bearer ${user.token}`
      });
    }
  } catch (e) {
    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('User unauthenticated!, Please login again.');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    } else {

    }
  } finally {
  }
};

