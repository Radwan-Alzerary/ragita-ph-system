import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function Sidebaritems(props) {
  const handleItemClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick prop if provided
    }
  };

  return (
    <Link to={props.router} style={{ textDecoration: "none" }}>
      <MenuItem icon={props.icon} onClick={handleItemClick} className="z-50">
        {props.title}
      </MenuItem>
    </Link>
  );
}

export default Sidebaritems;
