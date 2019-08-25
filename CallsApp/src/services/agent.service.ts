import requestFactory from '../utils/request-factory';
import { getFromLocalStorageAsync, removeFromLocaleStorageAsync, saveToLocalStorageAsync } from './common.service';
import { localStorageAuthKeys } from '../constants';
import { AgentAttendanceResponse, AgentStatus, AgentStatusResponse, AuthUser, BreakInfo, EndBreakInfoResponse, StartBreakInfoResponse } from '../types';

export const getAgentStatus: Function = async (user: AuthUser): Promise<AgentStatus> => {
  try {
    const { data } = await requestFactory.get('agent-status', {}, {
      Authorization: `Bearer ${user.token}`
    });
    const statusResponse: AgentStatusResponse = data;
    const agentStatus: AgentStatus = {
      checkInTime: statusResponse.check_in_time,
      isInActiveBreak: statusResponse.in_active_break,
      isInActiveShift: !statusResponse.in_active_break
    };
    return agentStatus;
  } catch (e) {
    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('User unauthenticated!, Please login again.');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    } else {

    }
  }
};

export const sendAgentStartShiftAttendance: Function = async (user: AuthUser): Promise<Date> => {
  try {
    const { data } = await requestFactory.post('agent-attend', {}, {
      Authorization: `Bearer ${user.token}`
    });
    const attendanceResponse: AgentAttendanceResponse = data;
    return new Date(attendanceResponse.check_in_time);
  } catch (e) {
    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('User unauthenticated!, Please login again.');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    } else {

    }
  }
};


export const sendAgentEndShift: Function = async (user: AuthUser): Promise<any> => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results;
};


export const sendAgentStartBreak: Function = async (user: AuthUser): Promise<BreakInfo> => {
  try {
    const { data } = await requestFactory.post('break', {}, {
      Authorization: `Bearer ${user.token}`
    });
    const breakInfoResponse: StartBreakInfoResponse = data;
    const breakInfo: BreakInfo = {
      startBreakTime: breakInfoResponse.break_time,
      breakId: breakInfoResponse.break_id
    };
    return breakInfo;
  } catch (e) {
    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('User unauthenticated!, Please login again.');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    } else {

    }
  }
};


export const sendAgentEndBreak: Function = async (user: AuthUser, lastBreakId: number): Promise<BreakInfo> => {
  try {

    const { data } = await requestFactory.put(`break/${lastBreakId}`, {}, {
      Authorization: `Bearer ${user.token}`
    });
    const breakInfoResponse: EndBreakInfoResponse = data;
    const breakInfo: BreakInfo = {
      endBreakTime: breakInfoResponse.end_time,
      breakId: breakInfoResponse.break_id
    };
    return breakInfo;
  } catch (e) {

    if (e.status.code >= 400 && e.status.code < 500)
      throw new Error('User unauthenticated!, Please login again.');
    else if (e.status.code >= 500) {
      throw new Error('Internal server error!, please try again later.');
    } else {

    }
  }
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
