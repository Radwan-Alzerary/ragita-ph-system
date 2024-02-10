import React, { useState } from "react";
import Salesposmainheaderitem from "./Salesposmainheaderitem";
import { IconButton, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
const Salesposmainheader = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (index === 0 && activeIndex !==index) {
      props.handleGetAllItemClick();
    }else if(index === 1 && activeIndex !==index){
      props.handleFavoriteClick()
    }
  };

  const categories = [
    { id: 0, name: "عام" },
    { id: 1, name: "المفضلة" },
    { id: 2, name: "الاكثر طلب" },
    { id: 3, name: "تحتوي صور" },
    // Add more categories as needed
  ];

  return (
    <div className="w-full flex justify-center ">
      <div className="h-12 w-full bg-white m-3 rounded-xl shadow flex items-center justify-around px-4">
        {categories.map((category, index) => (
          <Salesposmainheaderitem
            key={category.id}
            name={category.name}
            active={activeIndex === index}
            onClick={() => {
              handleItemClick(index);
            }}
          />
        ))}
      </div>
      <div className=" flex flex-col justify-center items-center pl-3">
          <div className="flex bg-white px-4 h-12  rounded-xl w-full shadow">
            <InputBase
              onChange={props.onSearchHandle}
              sx={{ ml: 1, flex: 1 }}
              size="small"
              placeholder="البحث عن منتج"
              inputProps={{ "aria-label": "البحث عن منتج" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </div>
        </div>

    </div>
  );
};

export default Salesposmainheader;
