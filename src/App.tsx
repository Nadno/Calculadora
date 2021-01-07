import React, { MouseEvent, useState } from "react";

import KeyBoard from "./Keyboard";
import { sum, subtract, multiply, divide } from "./utils/calc";

import "./App.scss";

interface Actions {
  [propName: string]: Function;
}

const App = () => {
  const [oldOperations, setOldOperations] = useState<Array<string>>([]);
  const [operation, setOperation] = useState<string>("");

  const [currentValue, setCurrentValue] = useState<string>("");
  const [lastValue, setLastValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const backSpace = () => {
    const lastChar = currentValue.length - 1;
    const stringBackSpaced = currentValue.slice(0, lastChar);
    setCurrentValue(stringBackSpaced);
  };

  const formatStringToNumber = (number: string) =>
    Number(number.replace(/,/, "."));

  const getResult = () => {
    if (!operation) return;

    const value1 = formatStringToNumber(lastValue) || 0;
    const value2 = formatStringToNumber(currentValue) || 0;
    console.log("***Soma: ", value1, operation, value2);
    const operators: Actions = {
      "+": sum,
      "/": divide,
      "-": subtract,
      x: multiply,
    };

    const calcResult: string = operators[operation](value1, value2).toString();

    setLastValue(calcResult ? calcResult : "");
    setResult(calcResult);
    setCurrentValue("");
    setOperation("");
  };

  const addOperation = (op: string) => {
    if (!currentValue && !result) return;
    if (operation) {
      getResult();
      setOperation(op);

      return;
    }
    setOperation(op);

    if (result) {
      setLastValue(result);
      setOldOperations([...oldOperations, result, op]);
      return;
    }

    setOldOperations([...oldOperations, currentValue, op]);

    setLastValue(currentValue);
    setCurrentValue("");
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.className !== "button") return;

    const buttonAction: Actions = {
      operators: () => {
        const operation = target.textContent || "";
        if (!["<", "/", "x", "+", "-", "="].includes(operation)) return;

        const operations: Actions = {
          "<": backSpace,
          "/": addOperation,
          x: addOperation,
          "+": addOperation,
          "-": addOperation,
          "=": () => {
            getResult();
            setOperation("");
            setOldOperations([]);
          },
        };

        operations[operation](operation);
      },

      numbers: () => {
        const value: string = target.textContent || "";
        setCurrentValue(currentValue + value);

        if (result) setResult("");
      },
    };

    const id = (target.parentNode as HTMLElement).id;
    buttonAction[id]();
  };

  return (
    <div className="app" onClick={handleClick}>
      <div id="result" className="app__result">
        {oldOperations.join(" ")}
        <br />
        {result
          ? formatStringToNumber(result).toLocaleString("basic")
          : formatStringToNumber(currentValue).toLocaleString("basic")}
        <br />
        {lastValue} {currentValue}
      </div>

      <KeyBoard />
    </div>
  );
};

export default App;
