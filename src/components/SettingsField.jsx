import React from "react";
import {
  CiCirclePlus,
  CiCircleMinus,
} from "react-icons/ci";
import {BsToggleOff, BsToggleOn} from 'react-icons/bs'
function SettingsField({
  title,
  add,
  subtract,
  minValue,
  maxValue,
  step,
  value,
  action,
  isBoolean,
}) {
  return (
    <div className="flex items-center justify-between bg-slate-700 rounded-md p-2 mb-4 shadow-md">
      <p className="flex-1 text-md">{title}</p>
      {isBoolean ? (
        <div
          className="flex items-center w-12"
          onClick={action}
        >
          <span className="text-3xl cursor-pointer">
            {value ? <BsToggleOn/> : <BsToggleOff/>}
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="text-xl cursor-pointer m-1" onClick={subtract}>
            <CiCircleMinus />
          </span>
          <input
            type="number"
            max={maxValue}
            min={minValue}
            step={step}
            value={value}
            onChange={action}
            className="bg-slate-700 outline-none border border-slate-500 text-center rounded-md px-2 py-1"
          />
          <span className="text-xl cursor-pointer m-1" onClick={add}>
            <CiCirclePlus />
          </span>
        </div>
      )}
    </div>
  );
}

export default SettingsField;
