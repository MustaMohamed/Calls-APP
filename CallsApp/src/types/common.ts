export enum TimeConversion {
  DayToHours = 24,
  HoursToMinutes = 60,
  MinutesToSeconds = 60
}


export interface HTTPResponse {
  hasError: boolean;
  error: any;
  data: any;
  status: {
    code: number;
    text: string;
  }
}
