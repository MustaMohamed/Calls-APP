import { agentActionsConstants } from '../../../constants';
import { AgentStatus } from '../states';
import { Action } from 'redux';
import { BreakInfo } from '../../agent';

export interface StartBreak extends Action {
  type: typeof agentActionsConstants.START_BREAK;
  payload: BreakInfo;
}

export interface EndBreak extends Action {
  type: typeof agentActionsConstants.END_BREAK;
  payload: BreakInfo;
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

export interface UpdateAgentLastAction extends Action {
  type: typeof agentActionsConstants.UPDATE_AGENT_LAST_ACTION;
  payload: Date;
}


export type AgentActions = StartBreak | EndBreak | StartShiftAttendance | EndShift | GetAgentStatus | UpdateAgentLastAction;
