import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const appendSymbol = (symbol) => {
    setInput((prev) => prev + symbol);
  };

  const clearDisplay = () => {
    setInput("");
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString()); // Note: eval should be avoided in real apps for security.
    } catch (error) {
      setInput("Error");
    }
  };

  const calculateAdvanced = (operation) => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      setInput("Error");
      return;
    }

    switch (operation) {
      case "sqrt":
        setInput(Math.sqrt(value).toFixed(6).toString());
        break;
      case "log":
        setInput(Math.log10(value).toFixed(6).toString());
        break;
      case "pow":
        const exponent = prompt("Enter exponent value:");
        if (!isNaN(exponent)) {
          setInput(Math.pow(value, exponent).toString());
        } else {
          setInput("Error");
        }
        break;
      default:
        setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <input
        type="text"
        value={input}
        readOnly
        className="display"
        placeholder="0"
      />
      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={() => appendSymbol("%")}>%</button>
        <button onClick={() => appendSymbol("/")}>/</button>
        <button onClick={() => appendSymbol("7")}>7</button>
        <button onClick={() => appendSymbol("8")}>8</button>
        <button onClick={() => appendSymbol("9")}>9</button>
        <button onClick={() => appendSymbol("*")}>*</button>
        <button onClick={() => appendSymbol("4")}>4</button>
        <button onClick={() => appendSymbol("5")}>5</button>
        <button onClick={() => appendSymbol("6")}>6</button>
        <button onClick={() => appendSymbol("-")}>-</button>
        <button onClick={() => appendSymbol("1")}>1</button>
        <button onClick={() => appendSymbol("2")}>2</button>
        <button onClick={() => appendSymbol("3")}>3</button>
        <button onClick={() => appendSymbol("+")}>+</button>
        <button onClick={() => appendSymbol("0")}>0</button>
        <button onClick={() => appendSymbol(".")}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => calculateAdvanced("pow")}>x<sup>y</sup></button>
        <button onClick={() => calculateAdvanced("log")}>log</button>
        <button onClick={() => calculateAdvanced("sqrt")}>√</button>
      </div>
    </div>
  );
};

export default App;
