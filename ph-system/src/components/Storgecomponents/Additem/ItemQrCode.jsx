import React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function ItemQrCode(props) {
  return (
    <div className=" w-1/5 h-28 bg-white shadow rounded-lg  items-center flex  gap-6  p-2">
      <div className="flex justify-around items-center w-full p-4">
        <div className={`${props.orginBarcode ? "bg-green-300" : ""} hover:bg-slate-100 p-2 flex flex-col justify-center items-center rounded-lg cursor-pointer`}>
          <QrCode2Icon sx={{ fontSize: 60 }}></QrCode2Icon>
          <div className=" text-sm">الباركود الحالي</div>
          <div className=" text-sm">{props.orginBarcode}</div>
        </div>
        <div onClick={props.handeNewBarcode} className={`${props.generatedBarcode ? "bg-green-300" : ""} overflow-hidden hover:bg-slate-100 p-2 flex flex-col justify-center items-center rounded-lg cursor-pointer`}>
        <QrCode2Icon sx={{ fontSize: 60 }}></QrCode2Icon>
          <div className=" text-sm" >توليد جديد</div>
          <div className=" text-sm">{props.generatedBarcode}</div>

        </div>
      </div>
    </div>
  );
}

export default ItemQrCode;
