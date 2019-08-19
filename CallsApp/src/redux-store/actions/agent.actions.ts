import { agentActionsConstants } from '../../constants';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AgentState, AgentActions } from '../../types/redux-store';
import { getAgentStatus, sendAgentEndBreak, sendAgentEndShift, sendAgentStartBreak, sendAgentStartShiftAttendance } from '../../services';

type AgentThunkAction = ThunkAction<Promise, AgentState, null, AgentActions>;

export const startAgentBreakAction: ActionCreator<AgentThunkAction> = (user): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentStartBreak(user);
    dispatch({
      type: agentActionsConstants.START_BREAK,
      payload: new Date()
    });
  };
};

export const endAgentBreakAction: ActionCreator<AgentThunkAction> = (user): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentEndBreak(user);
    dispatch({
      type: agentActionsConstants.END_BREAK,
      payload: new Date()
    });
  };
};

export const startAgentShiftAttendanceAction: ActionCreator<AgentThunkAction> = (user): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentStartShiftAttendance(user);
    dispatch({
      type: agentActionsConstants.START_SHIFT_ATTENDANCE,
      payload: new Date()
    });
  };
};

export const endAgentShiftAction: ActionCreator<AgentThunkAction> = (user): AgentThunkAction => {
  return async (dispatch: Dispatch) => {
    const result = await sendAgentEndShift(user);
    dispatch({
      type: agentActionsConstants.END_SHIFT,
      payload: new Date()
    });
  };
};

export const getAgentStatusAction: ActionCreator<AgentThunkAction> = (user): AgentThunkAction => {
  return async (dispatch: Function) => {
    const result = await getAgentStatus(user);
    console.log(result);
    dispatch({
      type: agentActionsConstants.GET_AGENT_STATUS,
      payload: {
        isInActiveBreak: false,
        isInActiveShift: true,
        isCheckIn: true,
        checkInTime: new Date((new Date().getDay() - 2)),
      }
    });
  };
};

