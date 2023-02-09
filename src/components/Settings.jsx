import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { SettingsField } from "./";
import { CiCircleRemove } from "react-icons/ci";
function Settings({ handleExit }) {
  const { settings, setSettings } = useStateContext();
  const [tempSettings, settempSettings] = useState(settings);
  function add(opt) {
    switch (opt) {
      case "pomodoro": {
        if (tempSettings.pomodoro <= 54)
          settempSettings((prev) => ({ ...prev, pomodoro: prev.pomodoro + 5 }));
        break;
      }
      case "shortBreak": {
        if (tempSettings.shortBreak <= 9)
          settempSettings((prev) => ({
            ...prev,
            shortBreak: prev.shortBreak + 1,
          }));
        break;
      }
      case "longBreak": {
        if (tempSettings.longBreak <= 25)
          settempSettings((prev) => ({
            ...prev,
            longBreak: prev.longBreak + 5,
          }));
        break;
      }
      case "longBreakDuration": {
        if (tempSettings.longBreakDuration <= 11)
          settempSettings((prev) => ({
            ...prev,
            longBreakDuration: prev.longBreakDuration + 1,
          }));
        break;
      }
    }
  }
  function subtract(opt) {
    switch (opt) {
      case "pomodoro": {
        if (tempSettings.pomodoro >= 30)
          settempSettings((prev) => ({ ...prev, pomodoro: prev.pomodoro - 5 }));
        break;
      }
      case "shortBreak": {
        if (tempSettings.shortBreak >= 4)
          settempSettings((prev) => ({
            ...prev,
            shortBreak: prev.shortBreak - 1,
          }));
        break;
      }
      case "longBreak": {
        if (tempSettings.longBreak >= 25)
          settempSettings((prev) => ({
            ...prev,
            longBreak: prev.longBreak - 5,
          }));
        break;
      }
      case "longBreakDuration": {
        if (tempSettings.longBreakDuration >= 3)
          settempSettings((prev) => ({
            ...prev,
            longBreakDuration: prev.longBreakDuration - 1,
          }));
        break;
      }
    }
  }
  function handleChange(e, type) {
    const value = parseInt(e.target.value);
    settempSettings((prev) => ({...prev, [type]: value}))
  }
  function toggleAutoStart() {
    settempSettings((prev) => ({ ...prev, autoStart: !prev.autoStart }));
  }
  function validate() {
    const pomodoroIsValid =
      tempSettings.pomodoro >= 25 && tempSettings.pomodoro <= 59;
    const shortBreakIsValid =
      tempSettings.shortBreak >= 3 && tempSettings.shortBreak <= 10;
    const longBreakIsValid =
      tempSettings.longBreak >= 20 && tempSettings.longBreak <= 30;
    const longBreakDurationIsValid =
      tempSettings.longBreakDuration >= 2 &&
      tempSettings.longBreakDuration <= 12;
    if (
      pomodoroIsValid &&
      shortBreakIsValid &&
      longBreakIsValid &&
      longBreakIsValid &&
      longBreakDurationIsValid
    )
      return true;
    return false;
  }
  function submit() {
    if (validate()) {
      setSettings(tempSettings);
      handleExit();
      return true;
    }
    return console.log("something is wrong in submition!");
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-screen h-full grid grid-cols-3 grid-rows-1 bg-[rgba(0,0,0,.75)] z-10">
      <div className="flex flex-col col-start-3 px-2 py-8 bg-slate-800">
        <header className="flex items-center justify-between">
          <h3 className="text-xl">Settings</h3>
          <div
            className="text-3xl shadow-sm text-slate-50 cursor-pointer"
            onClick={handleExit}
          >
            <CiCircleRemove />
          </div>
        </header>
        <div className="w-full h-1 bg-slate-700 rounded-sm mt-2 mb-4 shadow-sm"></div>
        <SettingsField
          title="Pomodoro"
          add={() => add("pomodoro")}
          subtract={() => subtract("pomodoro")}
          minValue="25"
          maxValue="59"
          step="5"
          value={tempSettings.pomodoro}
          action={(e) => handleChange(e, "pomodoro")}
        />
        <SettingsField
          title="Short Break"
          add={() => add("shortBreak")}
          subtract={() => subtract("shortBreak")}
          minValue="3"
          maxValue="10"
          step="1"
          value={tempSettings.shortBreak}
          action={(e) => handleChange(e, "shortBreak")}
        />
        <SettingsField
          title="Long Break"
          add={() => add("longBreak")}
          subtract={() => subtract("longBreak")}
          minValue="15"
          maxValue="30"
          step="5"
          value={tempSettings.longBreak}
          action={(e) => handleChange(e, "longBreak")}
        />
        <SettingsField
          title="Long Break Duration"
          add={() => add("longBreakDuration")}
          subtract={() => subtract("longBreakDuration")}
          minValue="3"
          maxValue="12"
          step="1"
          value={tempSettings.longBreakDuration}
          action={(e) => handleChange(e, "longBreakDuration")}
        />
        <SettingsField
          isBoolean={true}
          title="Auto Start"
          value={tempSettings.autoStart}
          action={toggleAutoStart}
        />
        {validate() && (
          <button
            className="flex items-center justify-center w-full bg-slate-900 rounded-md p-2 shadow-xl text-lg font-bold tracking-wide text-white"
            onClick={submit}
          >
            Save & Exit
          </button>
        )}
      </div>
    </div>
  );
}

export default Settings;
