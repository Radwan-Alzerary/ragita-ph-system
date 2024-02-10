import { IconButton } from "@mui/material";
import React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
function NewItemFotter(props) {
  return (
    <div className=" absolute bottom-0 h-16 w-full bg-white ">
      <div className="flex items-center h-full justify-between ">
        <div className="w-[33%] ">
          <button onClick={props.onClick}
            type="submit"
            class="text-black w-[31%] bg-green-400 hover:bg-green-500  font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
          >
            انتهاء
          </button>
          <button
            type="button"
            class="text-black w-[31%] bg-red-400 hover:bg-red-500 font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
          >
            الغاء
          </button>
        </div>
        <div className="h-full flex gap-3">
          <div className=" h-full  w-16 bg-amber-100 hover:bg-amber-200 cursor-pointer">
            <div className="flex flex-col justify-center items-center ">
              طباعة
              <QrCode2Icon></QrCode2Icon>
            </div>
          </div>
          <div className=" h-full  w-16 bg-red-100 hover:bg-red-200 cursor-pointer">
            <div className="flex flex-col justify-center items-center ">
              مفضل
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewItemFotter;
