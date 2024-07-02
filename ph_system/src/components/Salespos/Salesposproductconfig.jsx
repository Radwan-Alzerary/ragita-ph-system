import React, { useEffect, useState } from "react";
import { SalesPosSelectors } from "./SalesPosSelectors";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Autocomplete, TextField } from "@mui/material";
import { Calculate, Person } from "@mui/icons-material";

const Salesposproductconfig = (props) => {
  const [posConfig, setPosConfig] = useState({
    storge: props.storeList.find((item) => item.name === "مخزن الادويه"),
  });


  const setDataValue = (name, value) => {
    setPosConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" w-full  mb-2 flex justify-center items-center text-right h-[20%] bg-gray-100 ">
      <div className=" bg-white w-full flex justify-center items-center flex-col  h-full px-2 rounded-2xl shadow">
        <div className="flex justify-center items-center gap-3 w-full">
          <Autocomplete
            id="country-select-demo"
            required
            options={props.storeList}
            size="small"
            autoHighlight
            value={posConfig.storge}
            onChange={(event, newValue) => {
              // setDataValue("storge", newValue);
            }}
            getOptionLabel={(option) => option.name}
            sx={{
              width: 170,
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="المخزن"
                variant="standard"
                color="warning"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
          <Autocomplete
            id="country-select-demo"
            required
            options={props.paymentype}
            size="small"
            autoHighlight
            value={props.paymentypeSelect}
            onChange={(event, newValue) => {
              props.changePaymeny(newValue);
            }}
            getOptionLabel={(option) => option.name}
            sx={{
              width: 170,
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="نوع الدفع"
                variant="standard"
                color="warning"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
          <div onClick={()=>{props.showCalculator()}} className=" w-10 h-10 bg-slate-200 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-xl ">
            <Calculate ></Calculate>
          </div>

          <div className=" w-10 h-10 bg-slate-200 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-xl ">
            <AttachMoneyIcon></AttachMoneyIcon>
          </div>
        </div>
        <div className="flex gap-3 w-full justify-center items-end">
          {props.costemers && props.costemers.length ? (
            <Autocomplete
              id="country-select-demo"
              required
              freeSolo
              disableClearable
              options={props.costemers}
              size="small"
              autoHighlight
              inputValue={props.costemerNumberInput}
              onInputChange={(event, newInputValue) => {
                props.handeNewCostemerPhoneNumber(newInputValue);
              }}
              getOptionLabel={(option) => option.phoneNumber}
              sx={{
                width: 170,
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              renderInput={(params) => (
                <TextField

                  {...params}
                  label="رقم الهاتف"
                  variant="standard"
                  color="warning"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          ) : (
            ""
          )}
          {props.costemers && props.costemers.length ? (
            <Autocomplete
              id="country-select-demo"
              required
              freeSolo
              disableClearable
              size="small"
              autoHighlight
              options={props.costemers}
              inputValue={props.costemerNameInput}
              onInputChange={(event, newInputValue) => {
                props.handeNewCostemerName(newInputValue);
              }}
              onChange={(event,value)=>{
                props.handleCostemerNameSelect(value)
              }}
              getOptionLabel={(option) => option.name}
              sx={{
                width: 170,
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="اسم الزبون"
                  variant="standard"
                  color="warning"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          ) : (
            ""
          )}
          <div className=" w-10 h-10 bg-slate-200 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-xl">
            <Person></Person>
          </div>

          <div className=" w-10 h-10 bg-slate-200 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-xl">
            <ReceiptLongIcon></ReceiptLongIcon>
          </div>
        </div>
        {/* <div className="w-full">
          <SalesPosSelectors
            width={375}
            title={"الباركود"}
            data={paymentTypeSelectorData}
            freeSolo={true}
            defaultSelector={""}
          ></SalesPosSelectors>
          
        </div> */}
      </div>
    </div>
  );
};

export default Salesposproductconfig;
