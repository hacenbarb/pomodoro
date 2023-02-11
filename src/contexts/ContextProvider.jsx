import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 20,
  longBreakDuration: 4,
  autoStart: false,
};

export function ContextProvider({ children }) {
  const settingsValue = localStorage.getItem("settings") !== null
    ? JSON.parse(localStorage.getItem("settings"))
    : initialSettings;
  const [settings, setSettings] = useState(settingsValue);
  function updateSettings(obj) {
    setSettings(obj);
    localStorage.setItem("settings", JSON.stringify(obj));
  }
  return (
    <StateContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
