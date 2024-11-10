const getCurrentTime = () => {
  const now = Date.now();
  return now;
};

const getCurrentEpochTimestamp = (): number => {
  return +getCurrentTime();
};

export const getCurrentDayStartTimestamp = (): number => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  return +startOfDay;
}

export const getTimestampForNDaysAgo = (days: number): number => {
  const nDaysInMilliseconds = days * 24 * 60 * 60 * 1000;
  const now = getCurrentTime(); // current time in milliseconds
  const timestampForNDaysAgo = now - nDaysInMilliseconds;
  return timestampForNDaysAgo;
}


export { getCurrentTime, getCurrentEpochTimestamp };
