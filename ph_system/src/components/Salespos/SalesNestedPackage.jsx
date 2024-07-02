import React from "react";
import { useEffect } from "react";

function SalesNestedPackage(props) {
  useEffect(() => {
    // console.log(props);
  });

  return (
    <div
      className="bg-green-600 rounded-xl hover:bg-green-400 text-black cursor-pointer h-20 w-full flex-wrap flex justify-center items-center"
      onClick={props.onClick}
    >
      <p className=" text-white text-lg">{props.nestedPackage.packaging.name}</p>
    </div>
  );
}

export default SalesNestedPackage;
