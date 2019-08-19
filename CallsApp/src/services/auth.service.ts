import requestFactory from '../utils/request-factory';
import { isEmpty } from './validation.service';
import { getFromLocalStorageAsync, removeFromLocaleStorageAsync, saveToLocalStorageAsync } from './common.service';
import { localStorageAuthKeys } from '../constants';

export const userLogin: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};

export const userLogout = async () => {
  return await removeAuthentication();
};

export const checkAuthentication = async () => {
  const res = await getFromLocalStorageAsync(localStorageAuthKeys.AUTH_USER);
  return !isEmpty(res);
};

export const getAuthentication = async () => {
  const res = await getFromLocalStorageAsync(localStorageAuthKeys.AUTH_USER);
  return JSON.parse(res);
};

export const saveAuthentication = async (user) => {
  try {
    await saveToLocalStorageAsync(localStorageAuthKeys.AUTH_USER, JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
};

export const removeAuthentication = async () => {
  await removeFromLocaleStorageAsync(localStorageAuthKeys.AUTH_USER)
};
