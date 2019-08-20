import { AgentActions, AgentState, AgentStatus } from '../../types/redux-store';
import { agentActionsConstants } from '../../constants/redux-store/actions';
import { Reducer } from 'redux';

const initialState: AgentState = {
  agentStatus: {
    isInActiveBreak: false,
    isInActiveShift: true,
    checkInTime: new Date(new Date().toLocaleString()),
    lastAction: undefined
  },
  startShiftTime: undefined,
  endShiftTime: undefined,
  endBreakTime: undefined,
  startBreakTime: undefined
};

export const agentReducer: Reducer<AgentState, AgentActions> = (state: AgentState = initialState, action: AgentActions): AgentState => {
  let { agentStatus }: AgentStatus = state;
  if (!agentStatus)
    agentStatus = {};
  switch (action.type) {
    case agentActionsConstants.GET_AGENT_STATUS:
      return { ...state, agentStatus: action.payload as AgentStatus };
    case agentActionsConstants.UPDATE_AGENT_LAST_ACTION:
      return {
        ...state,
        agentStatus: Object.assign(agentStatus as AgentStatus, {
          ...agentStatus,
          lastAction: action.payload
        })
      };
    case agentActionsConstants.START_SHIFT_ATTENDANCE:
      return {
        ...state,
        startShiftTime: action.payload,
        agentStatus: Object.assign(agentStatus as AgentStatus, {
          ...agentStatus,
          checkInTime: action.payload,
          isInActiveBreak: false,
          isInActiveShift: true
        })
      };
    case agentActionsConstants.END_SHIFT:
      return {};
    case agentActionsConstants.START_BREAK:
      return {
        ...state,
        startBreakTime: action.payload,
        agentStatus: Object.assign(agentStatus as AgentStatus, {
          ...agentStatus,
          isInActiveBreak: true,
          isInActiveShift: false
        })
      };
    case agentActionsConstants.END_BREAK:
      return {
        ...state,
        endBreakTime: action.payload,
        agentStatus: Object.assign(agentStatus as AgentStatus, {
          ...agentStatus,
          isInActiveBreak: false,
          isInActiveShift: true
        })
      };
    default:
      return state;
  }
};
