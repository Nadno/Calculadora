import React from "react";

import "./index.scss";

const KeyBoard = () => {
  const operators: Array<string> = ["<", "/", "x", "-", "+", "="];
  const numbers: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+/-", "0", ","];
  return (
    <div className="c-keyboard">
      <div className="c-keyboard__complex-operators"></div>
      <div id="operators" className="c-keyboard__operators">
        {operators.map((key) => (
          <div className="button" key={key}>{key}</div>
        ))}
      </div>
  
      <div id="numbers" className="c-keyboard__numbers">
      {numbers.map((key) => (
          <div className="button" key={key}>{key}</div>
        ))}
      </div>
    </div>
  );
};

export default KeyBoard;
