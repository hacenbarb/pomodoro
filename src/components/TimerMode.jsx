import React from 'react'

function TimerMode({modeName, modeTitle, setMode, isActive}) {
  const classes = `cursor-pointer font-semibold p-2 ${isActive === modeName ? 'underline underline-offset-8 text-slate-100' : 'text-gray-500'} `
  return (
    <p onClick={() => setMode(modeName)} className={classes}>{modeTitle}</p>
  )
}

export default TimerMode