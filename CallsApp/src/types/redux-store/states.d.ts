export interface AppState {
  uiLoaderIsActive?: boolean;
  appIsInBackground?: boolean;
}

export interface AuthState {
  isAuthenticated?: boolean;
  user?: {}
}

export interface AgentState {
  startBreakTime?: Date;
  endBreakTime?: Date;
  startShiftTime?: Date;
  endShiftTime?: Date;
  agentStatus?: AgentStatus;
}


/* helpers */
export interface AgentStatus {
  isInActiveBreak: boolean;
  isInActiveShift: boolean;
  checkInTime?: Date;
  lastAction?: Date;
}
