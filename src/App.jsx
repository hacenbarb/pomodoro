import React, { useState, useEffect } from "react";
import { Timer, TimerModesWrapper } from "./components";
import { timerModes, pomodoroRepeat } from "./constants";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { CiCircleMore } from "react-icons/ci";
dayjs.extend(objectSupport);

function App() {
  const [showMore, setShowMore] = useState(false);
  const [modeIsActive, setModeIsActive] = useState("pomodoro");
  const [autoStart, setAutoStart] = useState(true);
  const [pomodoroCount, setpomodoroCount] = useState(0);

  function pomodoroCountPlus() {
    setpomodoroCount((prev) => prev + 1);
  }
  function toggleShowMore() {
    setShowMore((prev) => !prev);
  }
  function nextMode() {
    const addedPomodoro = pomodoroCount + 1
    const pomodoroMode = timerModes[0].name;
    const shortBreakMode = timerModes[1].name;
    const longBreakMode = timerModes[2].name;
    switch (modeIsActive) {
      case pomodoroMode:
        addedPomodoro !== 0 && addedPomodoro % pomodoroRepeat === 0
          ? setModeIsActive(longBreakMode)
          : setModeIsActive(shortBreakMode);
        break;
      case shortBreakMode:
        setModeIsActive(pomodoroMode);
        break;
      case longBreakMode:
        setModeIsActive(pomodoroMode);
        break;
      default:
        console.log("something is wrong");
    }
  }
  return (
    <div className="bg-gray-900 text-white">
      <div className="container">
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <TimerModesWrapper
            isActive={modeIsActive}
            setMode={setModeIsActive}
          />
          <Timer
            mode={modeIsActive}
            nextMode={nextMode}
            pomodoroCount={pomodoroCount}
            pomodoroCountPlus={pomodoroCountPlus}
            autoStart={autoStart}
          />
        </div>
      </div>
      <div className="absolute right-8 bottom-8 flex flex-col-reverse items-center justify-center gap-4 w-32 bg-blue-300 p-4 overflow-hidden">
        <div
          className="text-4xl cursor-pointer rotate-90"
          onClick={toggleShowMore}
        >
          <CiCircleMore />
        </div>
        {showMore && (
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
            numquam.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
