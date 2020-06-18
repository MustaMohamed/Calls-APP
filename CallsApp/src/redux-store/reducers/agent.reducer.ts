import { AgentActions, AgentState, AgentStatus, BreakInfo } from '../../types/redux-store';
import { agentActionsConstants } from '../../constants/redux-store/actions';
import { Reducer } from 'redux';

const initialState: AgentState = {
  agentStatus: {
    isInActiveBreak: false,
    isInActiveShift: true,
    checkInTime: undefined,
    lastAction: undefined
  },
  shiftInfo: {
    startShiftTime: undefined,
    endShiftTime: undefined,
  },
  breakInfo: {
    startBreakTime: undefined,
    endBreakTime: undefined,
    breakId: undefined,

  }
};

export const agentReducer: Reducer<AgentState, AgentActions> = (state: AgentState = initialState, action: AgentActions): AgentState => {
  let { agentStatus, breakInfo, shiftInfo } = state;
  if (!agentStatus)
    agentStatus = {} as AgentStatus;
  switch (action.type) {
    case agentActionsConstants.GET_AGENT_STATUS:
      let newState = { ...state, agentStatus: action.payload as AgentStatus };
      return newState;
    case agentActionsConstants.UPDATE_AGENT_LAST_ACTION:
      newState = {
        ...state,
        agentStatus: Object.assign({}, {
          ...agentStatus,
          lastAction: action.payload
        })
      };
      return newState;
    case agentActionsConstants.START_SHIFT_ATTENDANCE:
      newState = {
        ...state,
        shiftInfo: {
          ...shiftInfo,
          startShiftTime: action.payload as Date,
        },
        agentStatus: Object.assign({}, {
          ...agentStatus,
          checkInTime: action.payload,
          isInActiveBreak: false,
          isInActiveShift: true
        })
      };
      return newState;
    case agentActionsConstants.END_SHIFT:
      return {};
    case agentActionsConstants.START_BREAK:
      newState = {
        ...state,
        breakInfo: {
          ...breakInfo,
          startBreakTime: (action.payload as BreakInfo).startBreakTime,
          breakId: (action.payload as BreakInfo).breakId,
          endBreakTime: null
        },
        agentStatus: Object.assign({}, {
          ...agentStatus,
          isInActiveBreak: true,
          isInActiveShift: false
        })
      };
      return newState;
    case agentActionsConstants.END_BREAK:
      newState = {
        ...state,
        breakInfo: {
          ...breakInfo,
          endBreakTime: (action.payload as BreakInfo).endBreakTime,
          breakId: (action.payload as BreakInfo).breakId,
          startBreakTime: null
        },
        agentStatus: Object.assign({}, {
          ...agentStatus,
          isInActiveBreak: false,
          isInActiveShift: true
        })
      };
      return newState;
    default:
      return state;
  }
};
