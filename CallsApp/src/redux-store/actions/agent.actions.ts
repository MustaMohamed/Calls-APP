import { agentActionsConstants } from '../../constants';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AgentState, AgentActions } from '../../types/redux-store';
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

export const startAgentBreakAction: ActionCreator<AgentThunkAction> = (user: any): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentStartBreak(user);
    await dispatch(updateAgentStatusLastActionAction());
    dispatch({
      type: agentActionsConstants.START_BREAK,
      payload: new Date((new Date()).toLocaleString())
    });
  };
};

export const endAgentBreakAction: ActionCreator<AgentThunkAction> = (user: any): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentEndBreak(user);
    await dispatch(updateAgentStatusLastActionAction());
    dispatch({
      type: agentActionsConstants.END_BREAK,
      payload: new Date((new Date()).toLocaleString())
    });
  };
};

export const startAgentShiftAttendanceAction: ActionCreator<AgentThunkAction> = (user: any): AgentThunkAction => {
  return async (dispatch) => {
    const result = await sendAgentStartShiftAttendance(user);
    // await dispatch(getAgentStatusAction());
    await dispatch(updateAgentStatusLastActionAction());
    dispatch({
      type: agentActionsConstants.START_SHIFT_ATTENDANCE,
      payload: new Date((new Date()).toLocaleString())
    });
  };
};

export const endAgentShiftAction: ActionCreator<AgentThunkAction> = (user: any): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentEndShift(user);
    await dispatch(deleteAgentStatusLastActionAction());
    dispatch({
      type: agentActionsConstants.END_SHIFT,
      payload: new Date((new Date()).toLocaleString())
    });
  };
};

export const getAgentStatusAction: ActionCreator<AgentThunkAction> = (user: any): AgentThunkAction => {
  return async (dispatch: Function) => {
    const result = await getAgentStatus(user);
    const lastAction = await getAgentLastActionTimeFromLocalStorage();
    dispatch({
      type: agentActionsConstants.GET_AGENT_STATUS,
      payload: {
        // this code when a real api call
        // isInActiveBreak: result.isInActiveBreak,
        // isInActiveShift: !result.isInActiveBreak,
        // checkInTime: result.checkinTime,
        // lastAction: new Date(lastAction)
        isInActiveBreak: false,
        isInActiveShift: true,
        checkInTime: new Date((new Date()).toLocaleString()),
        lastAction: new Date(lastAction)
      }
    });
  };
};

export const updateAgentStatusLastActionAction: ActionCreator<AgentThunkAction> = (): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const lastAction = await saveAgentLastActionTimeToLocalStorage((new Date()).toLocaleString());
    dispatch({
      type: agentActionsConstants.UPDATE_AGENT_LAST_ACTION,
      payload: new Date(lastAction)
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
