export const isCurrentTimeInWindow = (dataObj) => {
  const { meeting_date, meeting_time, entry_time } = dataObj;

  const isValidTimeFormat = (timeStr) => {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr);
  };

  const parseTime = (dateStr, timeStr) => {
    if (!dateStr || !isValidTimeFormat(timeStr)) return null;
    const isoString = `${dateStr}T${timeStr}:00`;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

  const now = new Date();
  const meetingTime = parseTime(meeting_date, meeting_time);
  const entryTime = parseTime(meeting_date, entry_time);

  // Validate times
  if (!meetingTime || !entryTime) {
    return false; // Invalid date/time format
  }

  if (meetingTime > entryTime) {
    return false; // Invalid time range
  }

  // Return whether current time is within range
  return now >= meetingTime && now <= entryTime;
};
