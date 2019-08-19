import requestFactory from '../utils/request-factory';

export const getAgentStatus: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};

export const sendAgentStartShiftAttendance: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentEndShift: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentStartBreak: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};


export const sendAgentEndBreak: Function = async (user): Promise => {
  const { results } = await requestFactory.get('https://randomuser.me/api/');
  return results[0];
};
