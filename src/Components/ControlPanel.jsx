import React from "react";

const ControlPanel = ({ start, stop, reset }) => {
  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default ControlPanel;
