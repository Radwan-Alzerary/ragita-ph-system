import React, { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

function PrintingQr(props) {
  const componentRef = useRef();

  useEffect(() => {
    console.log(props.dataToPrint);
    handlePrint(); // Wait for handlePrint() to finish
    props.feedback(); // After handlePrint() has finished, call feedback()
  }, [props.prints]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });

  return (
    <div>
      <div
        className="flex flex-col p-2 w-full h-[2cm] justify-center items-center"
        ref={componentRef}
      >
        <QRCode
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={props.dataToPrint ? props.dataToPrint : ""}
          viewBox={`0 0 256 256`}
        />{" "}
        <div className="text-xs">{props.name ? props.name : ""}</div>
      </div>
    </div>
  );
}

export default PrintingQr;
