export interface BreakInfo {
  startBreakTime?: Date;
  endBreakTime?: Date;
  breakId?: number;
}

export interface StartBreakInfoResponse {
  message: string;
  break_id: number;
  break_time: Date;
}

export interface EndBreakInfoResponse {
  message: string;
  break_id: number;
  end_time: Date;
}

export interface ShiftInfo {
  startShiftTime?: Date;
  endShiftTime?: Date;
}

export interface AgentStatus {
  isInActiveBreak: boolean;
  isInActiveShift: boolean;
  checkInTime?: Date;
  lastAction?: Date;
}

export interface AgentStatusResponse {
  check_in_time: string;
  in_active_break: boolean;
}

export interface AgentAttendanceResponse {
  message: string,
  check_in_time: string,
  type: string
}
