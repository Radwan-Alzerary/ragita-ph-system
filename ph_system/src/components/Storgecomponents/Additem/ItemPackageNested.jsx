import React, { useEffect, useState } from "react";
import Newitemautoinput from "./Newitemautoinput";
import { FormControlLabel, Switch, TextField } from "@mui/material";

function ItemPackageNested(props) {
  // Define state to store the values of the input fields
  const [packagingValue, setPackagingValue] = useState(props.filling);
  const [singlePriceValue, setSinglePriceValue] = useState("");
  const [singleProfitValue, setSingleProfitValue] = useState(100);
  const [wholesalePriceValue, setWholesalePriceValue] = useState("");
  const [wholesaleProfitValue, setWholesaleProfitValue] = useState(75);
  const [specialPriceValue, setSpecialPriceValue] = useState("");
  const [specialProfitValue, setSpecialProfitValue] = useState(50);
  const [activeChecked, setActiveChecked] = useState(true);
  const [defualtSelected, setDefualtSelected] = useState(false);
  const [purchasingPrice, setPurchasingPrice] = useState(0);
  const [totallPackageInside, setTotallPackageInside] = useState(props.filling);
  useEffect(() => {
    if (props.pcakageFillingInside) {
      console.log("x", props.pcakageFillingInside);
      const newFilling = props.pcakageFillingInside.find(
        (element) => element.id === props.packageId
      );
      if (newFilling) {
        console.log("y", newFilling.totall);
        setTotallPackageInside(newFilling.totall);
      }
    }
    // setTotallPackageInside(newFilling.totall)
  }, [props.pcakageFillingInside]);
  useEffect(() => {
    if (props.packageId === props.defaultPackage) {
      setDefualtSelected(true);
      setActiveChecked(true);
    } else {
      setDefualtSelected(false);
    }
  }, [props.defaultPackage]);

  useEffect(() => {
    if (!activeChecked) {
      // setPackagingValue("");
      setSinglePriceValue("");
      setSingleProfitValue("");
      setWholesalePriceValue("");
      setWholesaleProfitValue("");
      setSpecialPriceValue("");
      setSpecialProfitValue("");
    }
  }, [activeChecked]);

  useEffect(() => {
    console.log(
      props.packageId,
      packagingValue,
      singlePriceValue,
      singleProfitValue,
      wholesalePriceValue,
      wholesaleProfitValue,
      specialPriceValue,
      specialProfitValue,
      activeChecked,
      totallPackageInside
    );
    props.updateNestedInfo(
      props.packageId,
      packagingValue,
      singlePriceValue,
      singleProfitValue,
      wholesalePriceValue,
      wholesaleProfitValue,
      specialPriceValue,
      specialProfitValue,
      activeChecked,
      totallPackageInside
    );
  }, [
    props.packageId,
    packagingValue,
    singlePriceValue,
    singleProfitValue,
    wholesalePriceValue,
    wholesaleProfitValue,
    specialPriceValue,
    specialProfitValue,
    activeChecked,
    totallPackageInside,
  ]);

  useEffect(() => {
    if (activeChecked) {
      setPurchasingPrice(() => props.purchasingPrice);
    }
  }, [props.purchasingPrice]);

  useEffect(() => {
    if (activeChecked) {
      setPurchasingPrice(() => props.purchasingPrice);
      SpecialProfitSet(specialProfitValue);
      singleProfitSet(singleProfitValue);
      wholeProfitSet(wholesaleProfitValue);
    }
  }, [purchasingPrice]);

  const SpecialPriceSet = (SpecialPrice) => {
    setSpecialProfitValue(
      ((SpecialPrice / purchasingPrice) * 100 - 100).toFixed(2)
    );
  };

  const SpecialProfitSet = (Profit) => {
    setSpecialProfitValue(Profit);
    setSpecialPriceValue(
      Math.ceil((purchasingPrice * (1 + Profit / 100)).toFixed(2) / 250) * 250
    );
  };

  const SinglePriceSet = (SpecialPrice) => {
    setSinglePriceValue(SpecialPrice);
    setSingleProfitValue(
      ((SpecialPrice / purchasingPrice) * 100 - 100).toFixed(2)
    );
  };

  const singleProfitSet = (Profit) => {
    setSingleProfitValue(Profit);
    setSinglePriceValue(
      Math.ceil((purchasingPrice * (1 + Profit / 100)).toFixed(2) / 250) * 250
    );
  };

  const wholePriceSet = (SpecialPrice) => {
    setWholesalePriceValue(SpecialPrice);
    setWholesaleProfitValue(
      ((SpecialPrice / purchasingPrice) * 100 - 100).toFixed(2)
    );
  };

  const wholeProfitSet = (Profit) => {
    setWholesaleProfitValue(Profit);
    setWholesalePriceValue(
      Math.ceil((purchasingPrice * (1 + Profit / 100)).toFixed(2) / 250) * 250
    );
  };
  const fillChangeHnadle = (value) => {
    setPackagingValue(value);
  };
  useEffect(() => {
    props.onFillingChange(props.packageId, packagingValue);
  }, [packagingValue]);
  return (
    <div
      className="w-1/5 h-72 relative bg-white shadow rounded-lg flex flex-col gap-4 justify-center p-4"
      onClick={() => {
        console.log("cxxx");
      }}
    >
      {!activeChecked ? (
        <div className="w-full z-10 opacity-30 h-full bg-gray-200 rounded-lg absolute top-0 right-0"></div>
      ) : (
        ""
      )}
      <div className="flex justify-between items-center ">
        <h6 className="text-right">{props.name}</h6>
        <button
          type="button"
          onClick={() => {
            props.setDefultPackage(props.packageId);
          }}
          className={`w-24 rounded-full h-full p-1  ${
            defualtSelected
              ? "bg-green-300 hover:bg-gray-200"
              : "bg-gray-200 hover:bg-green-200"
          }`}
        >
          افتراضي
        </button>
        <FormControlLabel
          className="z-20"
          sx={{
            display: "block",
          }}
          control={
            <Switch
              disabled={defualtSelected}
              checked={activeChecked}
              onChange={(event) => {
                props.onUnactiveHande(props.packageId);
                setActiveChecked(!activeChecked);
              }}
              color="primary"
            />
          }
        />
      </div>
      <div className="flex gap-3">
        <Newitemautoinput
          width={120}
          required={activeChecked ? true : false}
          title={"عدد التعبئة"}
          value={packagingValue}
          setValue={fillChangeHnadle}
          type={"number"}
        />
        <TextField
          disabled
          value={totallPackageInside}
          size="small"
          sx={{ width: 100, textAlign: "center" }}
        ></TextField>
      </div>
      <div className="flex gap-3">
        <Newitemautoinput
          width={120}
          required={activeChecked ? true : false}
          title={"سعر بيع المفرد"}
          value={singlePriceValue}
          setValue={SinglePriceSet}
          type={"number"}
        />
        <Newitemautoinput
          width={100}
          required={activeChecked ? true : false}
          title={"نسبة الربح"}
          value={singleProfitValue}
          setValue={singleProfitSet}
          type={"number"}
        />
      </div>
      <div className="flex gap-3">
        <Newitemautoinput
          width={120}
          required={activeChecked ? true : false}
          title={"سعر بيع الجملة"}
          value={wholesalePriceValue}
          setValue={wholePriceSet}
          type={"number"}
        />
        <Newitemautoinput
          width={100}
          required={activeChecked ? true : false}
          title={"نسبة الربح"}
          value={wholesaleProfitValue}
          setValue={wholeProfitSet}
          type={"number"}
        />
      </div>
      <div className="flex gap-3">
        <Newitemautoinput
          width={120}
          required={activeChecked ? true : false}
          title={"سعر بيع الخاص"}
          value={specialPriceValue}
          // setValue={setSpecialPriceValue}
          setValue={SpecialPriceSet}
          type={"number"}
        />
        <Newitemautoinput
          width={100}
          required={activeChecked ? true : false}
          title={"نسبة الربح"}
          value={specialProfitValue}
          setValue={SpecialProfitSet}
          type={"number"}
        />
      </div>
    </div>
  );
}

export default ItemPackageNested;
