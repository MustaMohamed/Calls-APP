import requestFactory from '../utils/request-factory';
import { getFromLocalStorageAsync, removeFromLocaleStorageAsync, saveToLocalStorageAsync } from './common.service';
import { localStorageAuthKeys } from '../constants';

export const getAgentStatus: Function = async (user: any): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};

export const sendAgentStartShiftAttendance: Function = async (user: any): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentEndShift: Function = async (user: any): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentStartBreak: Function = async (user: any): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentEndBreak: Function = async (user: any): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};

export const getAgentLastActionTimeFromLocalStorage: Function = async (): Promise<any> => {
  const lastAction = await getFromLocalStorageAsync(localStorageAuthKeys.LAST_ACTION_TIME);
  return lastAction;
};

export const saveAgentLastActionTimeToLocalStorage: Function = async (lastActionTime): Promise<any> => {
  const lastAction = await saveToLocalStorageAsync(localStorageAuthKeys.LAST_ACTION_TIME, lastActionTime);
  return lastAction;
};

export const removeAgentLastActionTimeFromLocalStorage: Function = async (): Promise<any> => {
  await removeFromLocaleStorageAsync(localStorageAuthKeys.LAST_ACTION_TIME);
};
