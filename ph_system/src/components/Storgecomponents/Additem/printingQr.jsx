import React from "react";

function printingQr(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{props.qr}</div>
      <div>{props.name}</div>
    </div>
  );
}

export default printingQr;
