const addZero = (time) => ("0" + time).slice(-2);
const getTime = (timestamp) =>
  addZero(timestamp.getHours()) +
  ":" +
  addZero(timestamp.getMinutes()) +
  ":" +
  addZero(timestamp.getSeconds());
const getDate = (timestamp) =>
  addZero(timestamp.getDate()) +
  "." +
  addZero(timestamp.getMonth() + 1) +
  "." +
  timestamp.getFullYear();

const getTimeNow = () => getTime(new Date());
const getDateNow = () => getDate(new Date());

export { getTimeNow, getDateNow };
