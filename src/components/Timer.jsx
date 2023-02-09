import React, { useState, useEffect } from "react";
import {
  pomodoro,
  longBreak,
  shortBreak,
  timeZero,
  pomodoroRepeat,
  timerModes,
} from "../constants";
import { getMinutesString, getSecondsString } from "../utils";
import { TimerController as Controller } from "./";
import { useStateContext } from "../contexts/ContextProvider";

function Timer({
  mode,
  nextMode,
  pomodoroCount,
  pomodoroCountPlus,
}) {
  const [remainingTime, setRemainingTime] = useState(pomodoro);
  const [isPaused, setIsPaused] = useState(true);
  const {settings, toggleAutoStart} = useStateContext()
  function displayMinutes() {
    return getMinutesString(remainingTime).toString().padStart(2, "0");
  }
  function displaySeconds() {
    return getSecondsString(remainingTime).toString().padStart(2, "0");
  }
  function displayPomdoroCount() {
    return pomodoroCount.toString().padStart(2, "0");
  }
  function toggleTimer() {
    setIsPaused((prev) => !prev);
  }

  useEffect(() => {
    if (timeZero.isSame(remainingTime)) {
      if (mode === timerModes[0].name) pomodoroCountPlus();
      nextMode();
    }
  }, [remainingTime]);
  useEffect(() => {
    const intervale = setInterval(() => {
      if (!isPaused) {
        setRemainingTime((prev) => prev.subtract(1, "second"));
      }
    }, 1000);
    return () => clearInterval(intervale);
  }, [isPaused]);

  useEffect(() => {
    if (settings.autoStart) {
      if (
        (pomodoroCount % pomodoroRepeat === 0 && mode === timerModes[0].name) ||
        pomodoroCount === 0
      ) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    } else {
      setIsPaused(true);
    }
    switch (mode) {
      case timerModes[0].name:
        setRemainingTime(pomodoro);
        break;
      case timerModes[1].name:
        setRemainingTime(shortBreak);
        break;
      case timerModes[2].name:
        setRemainingTime(longBreak);
        break;
      default:
        console.log("something is wrong");
    }
  }, [mode]);
  return (
    <>
      <p className="text-9xl font-semibold p-4">
        {displayMinutes()}:{displaySeconds()}
        <br />
      </p>
      <p className="text-sm text-gray-500 font-light mb-8">
        #{displayPomdoroCount()}
      </p>
      <Controller
        isPaused={isPaused}
        toggleTimer={toggleTimer}
        nextMode={nextMode}
      />
    </>
  );
}

export default Timer;
