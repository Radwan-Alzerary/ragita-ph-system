import React from "react";
import { useEffect } from "react";

function SalesNestedPackage(props) {
  useEffect(() => {
    // console.log(props);
  });

  return (
    <div
      className="bg-slate-200 hover:bg-slate-100 text-black cursor-pointer h-12 w-14"
      onClick={props.onClick}
    >
      <p>{props.nestedPackage.packaging.name}</p>
    </div>
  );
}

export default SalesNestedPackage;
