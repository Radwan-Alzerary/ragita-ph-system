import React, { useEffect, useState } from "react";
import Newitemautoinput from "./Newitemautoinput";

function ItemExpire(props) {
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  useEffect(() => {
    props.updateExpireInfo(expireMonth, expireYear);
  }, [expireMonth, expireYear]);

  return (
    <div className=" h-40 bg-white shadow flex flex-col justify-center p-4 gap-3 rounded-xl">
      <p>الاكسباير</p>
      <Newitemautoinput
        value={expireYear}
        setValue={setExpireYear}
        width={100}
        title={"السنة"}
        required={true}
        type={"number"}
      ></Newitemautoinput>
      <Newitemautoinput
        type={"number"}
        required={true}
        value={expireMonth}
        setValue={setExpireMonth}
        width={100}
        title={"الشهر"}
      ></Newitemautoinput>
    </div>
  );
}

export default ItemExpire;
