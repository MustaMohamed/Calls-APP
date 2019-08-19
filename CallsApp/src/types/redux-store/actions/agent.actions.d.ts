import { agentActionsConstants } from '../../../constants';
import { AgentState, AgentStatus } from '../states';
import { Action } from 'redux';

export interface StartBreak extends Action {
  type: typeof agentActionsConstants.START_BREAK;
  payload: Date;
}

export interface EndBreak extends Action {
  type: typeof agentActionsConstants.END_BREAK;
  payload: Date;
}

export interface StartShiftAttendance extends Action {
  type: typeof agentActionsConstants.START_SHIFT_ATTENDANCE;
  payload: Date;
}

export interface EndShift extends Action {
  type: typeof agentActionsConstants.END_SHIFT;
  payload: Date;
}

export interface GetAgentStatus extends Action {
  type: typeof agentActionsConstants.GET_AGENT_STATUS;
  payload: AgentStatus;
}


export type AgentActions = StartBreak | EndBreak | StartShiftAttendance | EndShift | GetAgentStatus;
