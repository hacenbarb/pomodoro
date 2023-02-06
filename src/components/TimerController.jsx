import React from "react";
import { MdSkipNext, MdPause, MdPlayArrow } from "react-icons/md";
function TimerController({ isPaused, toggleTimer, nextMode }) {
  return (
    <div className="flex items-center justify-around min-w-[340px] text-4xl">
      <button onClick={toggleTimer}>
        {isPaused ? <MdPlayArrow /> : <MdPause />}
      </button>
      <button onClick={nextMode}> 
        <MdSkipNext />
      </button>
    </div>
  );
}

export default TimerController;
