import React, { useState } from "react";
import Salespositemcategoryselect from "./Salespositemcategoryselect";

const Salespositemcategory = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className=" w-[97%] overflow-auto  flex gap-2 items-center p-2 ">
      <Salespositemcategoryselect
        name={"الكل"}
        active={activeIndex === 0}
        onClick={() => {
          handleItemClick(0);
          props.getAllProduct();

        }}
      />

      {props.categoryList.map((category, index) => (
        <Salespositemcategoryselect
          key={category._id}
          name={category.name}
          active={activeIndex === index + 1}
          onClick={() => {
            handleItemClick(index + 1, category._id);
            props.handleNewProduct(category._id);
          }}
        />
      ))}
    </div>
  );
};

export default Salespositemcategory;
