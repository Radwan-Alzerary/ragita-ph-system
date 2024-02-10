import { TextField } from "@mui/material";
import React from "react";

const Salesposprices = (props) => {
  return (
    <div className="absolute -bottom-4 w-full h-40  rounded-xl ">
      <div className="flex  justify-around  items-center px-2  h-12 ">
        <div className="flex h-full justify-around rounded-lg gap-2  items-center w-full bg-white">
          <div className="flex  gap-2 ">
            <TextField
              type="Number"
              id="small-input"
              value={props.discountValue}
              placeholder="الخصم"
              // variant="standard"
              label="الخصم"
              onChange={props.setDiscountValue}
              size="small"
              inputProps={{ step: 250 }}
            ></TextField>
          </div>
          <>
            <TextField
              type="Number"
              id="small-input"
              value={props.amountPaid}
              placeholder="المبلغ المسدد"
              onChange={props.handleAmountPaidValueChange}
              label="المبلغ المسدد"
              size="small"
            ></TextField>
          </>
        </div>
      </div>
      <div className=" flex items-center gap-4 h-22 mt-2  justify-between px-2  w-full ">
        <div className=" text-center w-full h-22 p-3  bg-white rounded-lg border-slate-800 ">
          <div className=" text-black">سعر القائمة</div>
          <div className=" text-2xl font-bold text-green-400">
            {props.totallPrice ? props.totallPrice : ""}
          </div>
        </div>
        <div className=" text-center w-full h-22 p-3 bg-white rounded-lg">
          <div className=" text-black">مجموع الخصومات</div>
          <div className=" text-2xl font-bold text-green-400">
            {props.discountValue ? props.discountValue : ""}
          </div>
        </div>

        <div className=" text-center w-full h-22 p-3 bg-white rounded-lg">
          <div className=" text-black">السعر الكلي</div>
          <div className=" text-2xl font-bold text-green-400">
            {props.finalPrice ? props.finalPrice : ""}
          </div>
        </div>
        { props.paymentypeSelect ? props.paymentypeSelect.name === "نقدي" ? (
          ""
        ) : (
          <div className=" text-center w-full h-22 p-3 bg-white rounded-lg">
            <div className=" text-black">المبلغ المتبقي</div>
            <div className=" text-2xl font-bold text-red-400">
              {(props.finalPrice ? props.finalPrice : 0) -
                (props.amountPaid ? props.amountPaid : 0)}
            </div>
          </div>
        ) : ""}
      </div>
    </div>
  );
};

export default Salesposprices;
