import { AuthUser } from '../user';
import { AgentStatus, BreakInfo, ShiftInfo } from '../agent';

export interface AppState {
  uiLoaderIsActive?: boolean;
  appIsInBackground?: boolean;
}

export interface AuthState {
  isAuthenticated?: boolean;
  user?: AuthUser;
}

// break action should have an id
export interface AgentState {
  breakInfo?: BreakInfo;
  shiftInfo?: ShiftInfo;
  agentStatus?: AgentStatus;
}
