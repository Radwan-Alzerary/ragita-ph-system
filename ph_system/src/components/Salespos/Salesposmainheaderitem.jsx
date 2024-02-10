import React from "react";

function Salesposmainheaderitem(props) {
  return (
    <p
      className={`text-xl font-medium text-gray-800 ${
        props.active ? "text-orange-400" : "text-gray-800"
      } cursor-pointer hover:text-orange-400`}
      onClick={props.onClick} // Corrected placement of onClick prop
    >
      {props.name}
    </p>
  );
}

export default Salesposmainheaderitem;
