import { agentActionsConstants, appActionsConstants } from '../../constants';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AgentState, AgentActions, AuthUser, AgentStatus, BreakInfo } from '../../types';
import {
  getAgentLastActionTimeFromLocalStorage,
  getAgentStatus,
  saveAgentLastActionTimeToLocalStorage,
  sendAgentEndBreak,
  sendAgentEndShift,
  sendAgentStartBreak,
  sendAgentStartShiftAttendance,
  removeAgentLastActionTimeFromLocalStorage
} from '../../services';

type AgentThunkAction = ThunkAction<Promise<any>, AgentState, null, AgentActions>;

export const startAgentBreakAction: ActionCreator<AgentThunkAction> = (user: AuthUser): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const breakInfo: BreakInfo = await sendAgentStartBreak(user);
      await dispatch(updateAgentStatusLastActionAction(new Date()));
      dispatch({
        type: agentActionsConstants.START_BREAK,
        payload: breakInfo
      });
    } catch (e) {

      dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
    }
  };
};

export const endAgentBreakAction: ActionCreator<AgentThunkAction> = (user: AuthUser, lastBreakId: number): AgentThunkAction => {
  return async (dispatch: Dispatch) => {

    const breakInfo: BreakInfo = await sendAgentEndBreak(user, lastBreakId);
    await dispatch(updateAgentStatusLastActionAction(new Date()));
    dispatch({
      type: agentActionsConstants.END_BREAK,
      payload: breakInfo
    });
  };
};

export const startAgentShiftAttendanceAction: ActionCreator<AgentThunkAction> = (user: AuthUser): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const checkinTime = await sendAgentStartShiftAttendance(user);
      await dispatch(updateAgentStatusLastActionAction(new Date()));
      dispatch({
        type: agentActionsConstants.START_SHIFT_ATTENDANCE,
        payload: checkinTime
      });
    } catch (e) {

      dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
    }
  };
};

export const endAgentShiftAction: ActionCreator<AgentThunkAction> = (user: AuthUser): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    // const result = await sendAgentEndShift(user);
    await dispatch(deleteAgentStatusLastActionAction());
    dispatch({
      type: agentActionsConstants.END_SHIFT,
      payload: new Date()
    });
  };
};

export const getAgentStatusAction: ActionCreator<AgentThunkAction> = (user: AuthUser): AgentThunkAction => {
  return async (dispatch: Function) => {
    let statusResult: AgentStatus;
    try {
      statusResult = await getAgentStatus(user);
    } catch (e) {
      dispatch({ type: appActionsConstants.HIDE_APP_LOADER });
    }
    let lastAction = await getAgentLastActionTimeFromLocalStorage();
    if (!lastAction)
      lastAction = new Date();
    const agentStatus: AgentStatus = {
      // this code when a real api call
      ...statusResult,
      lastAction: new Date(lastAction)
    };
    dispatch({
      type: agentActionsConstants.GET_AGENT_STATUS,
      payload: agentStatus
    });
  };
};

export const updateAgentStatusLastActionAction: ActionCreator<AgentThunkAction> = (date: Date): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    await saveAgentLastActionTimeToLocalStorage(date);
    dispatch({
      type: agentActionsConstants.UPDATE_AGENT_LAST_ACTION,
      payload: date
    });
  };
};

export const deleteAgentStatusLastActionAction: ActionCreator<AgentThunkAction> = (): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    await removeAgentLastActionTimeFromLocalStorage();
    dispatch({
      type: agentActionsConstants.UPDATE_AGENT_LAST_ACTION,
      payload: undefined
    });
  };
};
