import React, { MouseEvent, useState } from "react";

import KeyBoard from "./Keyboard";
import { sum, subtract, multiply, divide } from "./utils/calc";

import "./App.scss";

interface Actions {
  [propName: string]: Function;
}

const App = () => {
  const [oldOperations, setOldOperations] = useState<string>("");
  const [operation, setOperation] = useState<string>("");

  const [currentValue, setCurrentValue] = useState<string>("");
  const [lastValue, setLastValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const backSpace = () => {
    const lastChar = currentValue.length - 1;
    const stringBackSpaced = currentValue.slice(0, lastChar);
    setCurrentValue(stringBackSpaced);
  };

  const formatStringToNumber = (number: string): number =>
    Number(number.replace(/,/, "."));

  const getResult = (): string => {
    if (!operation) return "";

    const first = formatStringToNumber(lastValue);
    const second = formatStringToNumber(currentValue);

    const operators: Actions = {
      "+": sum,
      "/": divide,
      "-": subtract,
      x: multiply,
    };

    return operators[operation](first, second).toString();
  };

  const addOperation = (op: string) => {
    const lastChar = oldOperations[oldOperations.length - 1];
    if (["/", "x", "-", "+"].includes(lastChar) && !currentValue)
      return;

    setOldOperations(`${oldOperations} ${currentValue} ${op}`);

    const addOperationOverOperation = !!operation;
    if (addOperationOverOperation) {
      const calcResult = getResult();
      setLastValue(calcResult ? calcResult : "");
      setResult(calcResult);
      setCurrentValue("");
      setOperation(op);

      return;
    }

    setOperation(op);

    const addOperationOverResult = !!result;
    if (addOperationOverResult) {
      setLastValue(result);
      setOldOperations(`${oldOperations} ${result} ${op}`);
      return;
    }

    setLastValue(currentValue);
    setCurrentValue("");
  };

  const resultOperation = () => {
    setResult(getResult());
    setOldOperations("");
    setCurrentValue("");
    setOperation("");
  };

  const handleNumbers = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.className !== "button") return;

    let button = target.textContent || "";

    const buttonsActions: Actions = {
      "+/-": () => {
        const number = formatStringToNumber(currentValue) || 0;
        const negate = -1;

        setCurrentValue(String(number * negate));
      },

      ",": () => {
        if (currentValue.includes(",")) return;

        let value = button;
        if (!currentValue) value = "0,";
        setCurrentValue(currentValue + value);
      },

      default: () => {
        let value = "";

        if (Number.isFinite(Number(button))) value = button;

        setCurrentValue(currentValue + value);
      },
    };

    buttonsActions[button]
      ? buttonsActions[button]()
      : buttonsActions.default();

    if (result) setResult("");
  };

  const handleOperators = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.className !== "button") return;

    const button = target.textContent || "";
    const buttonsActions: Actions = {
      "<": backSpace,
      "/": addOperation,
      x: addOperation,
      "+": addOperation,
      "-": addOperation,
      "=": resultOperation,
    };

    if (buttonsActions[button]) buttonsActions[button](button);
  };

  const formatString = (string: string) => {
    const result = formatStringToNumber(string).toLocaleString("pt-BR");
    const lastChar = string.length - 1;
    if (string[lastChar] === ",") return result + ",";
    return result;
  };

  const formattedResult = result
    ? formatString(result)
    : formatString(currentValue);

  return (
    <div className="app">
      <div id="result" className="app__result">
        {oldOperations}
        <br />
        {formattedResult}
      </div>

      <div className="c-keyboard">
        <KeyBoard
          id="operators"
          className="c-keyboard__operators"
          onClick={handleOperators}
          buttonsList={["<", "/", "x", "-", "+", "="]}
        />

        <KeyBoard
          id="numbers"
          className="c-keyboard__numbers"
          onClick={handleNumbers}
          buttonsList={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "+/-",
            "0",
            ",",
          ]}
        />
      </div>
    </div>
  );
};

export default App;
