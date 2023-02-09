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
  const [settings, setSettings] = useState(initialSettings);

  function setPomodoro(value) {
    setSettings((prev) => ({ ...prev, pomodoro: value }));
  }
  function setShortBreak(value) {
    setSettings((prev) => ({ ...prev, shortBreak: value }));
  }
  function setLongBreak(value) {
    setSettings((prev) => ({ ...prev, longBreak: value }));
  }
  function setLongBreakDuration(value) {
    setSettings((prev) => ({ ...prev, longBreakDuration: value }));
  }
  function toggleAutoStart() {
    setSettings((prev) => ({ ...prev, autoStart: !prev.autoStart }));
  }

  return (
    <StateContext.Provider
      value={{
        settings,
        setSettings,
        setPomodoro,
        setShortBreak,
        setLongBreak,
        setLongBreakDuration,
        toggleAutoStart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
