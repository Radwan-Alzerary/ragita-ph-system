import React, { useState } from "react";
const buttonValues = [
  "AC",
  "DEL",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  "00",
  ".",
  "=",
];

function Calculator(props) {
  const [output, setOutput] = useState("");
  const specialChars = ["%", "*", "/", "-", "+", "="];
  const isOperator = (btnValue) => {
    return specialChars.includes(btnValue) && btnValue !== "=";
  };

  const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
      setOutput(eval(output.replace("%", "/100")).toString());
    } else if (btnValue === "AC") {
      setOutput("");
    } else if (btnValue === "DEL") {
      // If DEL button is clicked, remove the last character from the output.
      setOutput(output.slice(0, -1));
    } else {
      // If output is empty and button is specialChars then return
      if (output === "" && specialChars.includes(btnValue)) return;
      setOutput(output + btnValue);
    }
  };

  return (
    <div>
    <div
      style={{ direction: "ltr" }}
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  bg-white p-5 rounded-xl z-50"
    >
      <input
        type="text"
        className="h-16 p-4 w-full border-2 rounded-md  text-right mb-4 text-2xl text-black pointer-events-none"
        value={output}
        readOnly
        autoFocus
      />
      <div className="grid grid-cols-4 gap-4">
        {buttonValues.map((value) => (
          <button
            key={value}
            className={`p-5 focus:bg-green-100 rounded-md border-none text-lg cursor-pointer ${
              isOperator(value) ? " text-blue-500 bg-gray-200" : "bg-gray-200"
            }`}
            data-value={value}
            onClick={() => calculate(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
<div className="w-full h-full fixed bg-black opacity-10 z-20" onClick={()=>props.handleHide()}></div>
    </div>
  );
}

export default Calculator;
