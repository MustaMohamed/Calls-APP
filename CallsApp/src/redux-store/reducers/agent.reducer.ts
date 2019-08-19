import { AgentActions, AgentState } from '../../types/redux-store';
import { agentActionsConstants } from '../../constants/redux-store/actions';
import { Reducer } from 'redux';

const initialState: AgentState = {};

export const agentReducer: Reducer<AgentState> = (state: AgentState = initialState, action: AgentActions): AgentState => {
  switch (action.type) {
    case agentActionsConstants.GET_AGENT_STATUS:
      return { ...state, agentStatus: action.payload };
    case agentActionsConstants.START_SHIFT_ATTENDANCE:
      return { ...state, startShiftTime: action.payload };
    case agentActionsConstants.END_SHIFT:
      return { ...state, endShiftTime: action.payload };
    case agentActionsConstants.START_BREAK:
      return { ...state, startBreakTime: action.payload };
    case agentActionsConstants.END_BREAK:
      return { ...state, endBreakTime: action.payload };
    default:
      return state;
  }
};
