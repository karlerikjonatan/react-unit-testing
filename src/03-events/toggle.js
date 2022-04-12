import React, { useState } from "react";

export default function Toggle() {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState((previousState) => !previousState);
      }}
      data-testid="toggle"
    >
      {state === true ? "on" : "off"}
    </button>
  );
}
