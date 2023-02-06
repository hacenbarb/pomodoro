import React from "react";
import { TimerMode } from "./";
import { timerModes } from "../constants";
function TimerModesWrapper({ isActive, setMode }) {
  return (
    <div className="flex flex-row items-center justify-center mb-8 gap-4">
      {timerModes.map((mode, c) => (
        <TimerMode key={c} modeName={mode.name} modeTitle={mode.title} isActive={isActive} setMode={setMode} />
      ))}
    </div>
  );
}

export default TimerModesWrapper;
