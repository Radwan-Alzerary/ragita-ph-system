import React from "react";

function BackroundShadow(props) {
  const handleItemClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick prop if provided
    }
  };

  return (
    <div
      onClick={handleItemClick}
      className="fixed w-screen h-screen top-0 bg-black opacity-10 z-10"
    ></div>
  );
}

export default BackroundShadow;
