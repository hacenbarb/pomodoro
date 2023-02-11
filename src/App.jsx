import React, { useState, useEffect } from "react";
import { Timer, TimerModesWrapper, Settings } from "./components";
import { timerModes } from "./constants";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { CiCircleMore } from "react-icons/ci";
import { useStateContext } from "./contexts/ContextProvider";
dayjs.extend(objectSupport);

function App() {
  const [showMore, setShowMore] = useState(false);
  const [modeIsActive, setModeIsActive] = useState("pomodoro");
  const [pomodoroCount, setpomodoroCount] = useState(0);
  const { settings } = useStateContext();

  function handlePomodoroCount() {
    const Todaydate = new Date();
    if (localStorage.getItem("date") === Todaydate.toDateString()) {
      if (localStorage.getItem("pomodoroCount") !== null) {
        setpomodoroCount(parseInt(localStorage.getItem("pomodoroCount")));
      }
      localStorage.setItem("pomodoroCount", 0);
    } else {
      localStorage.setItem("date", Todaydate.toDateString());
      localStorage.setItem("pomodoroCount", 0);
    }
  }
  function pomodoroCountPlus() {
    setpomodoroCount((prev) => prev + 1);
  }
  function toggleShowMore() {
    setShowMore((prev) => !prev);
  }
  function nextMode() {
    const addedPomodoro = pomodoroCount + 1;
    const pomodoroMode = timerModes[0].name;
    const shortBreakMode = timerModes[1].name;
    const longBreakMode = timerModes[2].name;
    switch (modeIsActive) {
      case pomodoroMode:
        addedPomodoro !== 0 && addedPomodoro % settings.longBreakDuration === 0
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
  useEffect(() => {
    handlePomodoroCount();
  }, []);
  useEffect(() => {
    localStorage.setItem("pomodoroCount", pomodoroCount);
  }, [pomodoroCount]);
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
          />
        </div>
      </div>
      <div
        className="fixed right-8 bottom-8 text-5xl cursor-pointer rotate-90 z-10"
        onClick={toggleShowMore}
      >
        <CiCircleMore />
      </div>
      {showMore && <Settings handleExit={toggleShowMore} />}
    </div>
  );
}

export default App;
