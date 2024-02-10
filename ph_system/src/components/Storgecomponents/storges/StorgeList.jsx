import React from "react";
import WarehouseIcon from "@mui/icons-material/Warehouse";

function StorgeList(props) {
  return (
    <div className=" h-72 w-72 bg-white flex  justify-center shadow-md rounded-md hover:opacity-70 cursor-pointer items-center">
      <div>
        <div className=" text-center text-2xl text-green-600 font-semibold">
          {props.defult ? "افتراضي" : null}
        </div>

        <WarehouseIcon
          className=" text-black"
          sx={{ fontSize: 180 }}
        ></WarehouseIcon>
        <div className=" text-center text-2xl font-semibold"> {props.name}</div>
      </div>
    </div>
  );
}

export default StorgeList;
