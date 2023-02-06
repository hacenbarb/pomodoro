import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

export const pomodoro = dayjs({
  minutes: 0,
  seconds: 2,
});
export const shortBreak = dayjs({
  minutes: 0,
  seconds: 1,
});
export const longBreak = dayjs({
  minutes: 0,
  seconds: 2,
});
export const timeZero = dayjs({
  minutes: 0,
  seconds: 0,
});

export const timerModes = [
  { name: "pomodoro", title: "Pomodoro" },
  { name: "shortBreak", title: "Short Break" },
  { name: "longBreak", title: "Long Break" },
];

export const pomodoroRepeat = 3