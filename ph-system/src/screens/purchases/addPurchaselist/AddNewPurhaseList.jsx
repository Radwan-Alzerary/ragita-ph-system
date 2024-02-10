import React from "react";
import { PurchasesAutoComplet } from "../../../components/purchases/PurchasesAutoComplet";
import PurchasesInput from "../../../components/purchases/PurchasesInput";
import PurchasesNewList from "../../../components/purchases/PurchasesNewList";
import Salesposfooter from "../../../components/Salespos/Salesposfooter";
import PurchasesFotter from "../../../components/purchases/PurchasesFotter";
import CustomizedTables from "../../../components/purchases/xx";

function AddNewPurhaseList() {
  const storageSelectorData = ["مخزن 1", "مخزن ادوية"];

  return (
    <div>
      <div className="flex flex-col">
        <div className=" bg-white p-4 shadow my-2 h-[14vh]">
          <div className="w-full flex  items-center justify-around gap-4">
            <PurchasesInput title="رقم الوصل" width={170}></PurchasesInput>

            <PurchasesAutoComplet
              width={170}
              title={"المذخر"}
              data={storageSelectorData}
              freeSolo={false}
              defaultSelector={[storageSelectorData[0]]}
            ></PurchasesAutoComplet>
            <PurchasesInput title="تاريخ الوصل" width={170}></PurchasesInput>
            <PurchasesAutoComplet
              width={170}
              title={"العملة"}
              data={storageSelectorData}
              freeSolo={false}
              defaultSelector={[storageSelectorData[0]]}
            ></PurchasesAutoComplet>
            <PurchasesAutoComplet
              width={170}
              title={"نوع الدفع"}
              data={storageSelectorData}
              freeSolo={false}
              defaultSelector={[storageSelectorData[0]]}
            ></PurchasesAutoComplet>
            <PurchasesAutoComplet
              width={170}
              title={"المخزن"}
              data={storageSelectorData}
              freeSolo={false}
              defaultSelector={[storageSelectorData[0]]}
            ></PurchasesAutoComplet>
            <button className="w-24 h-8 bg-green-400 rounded-lg hover:bg-green-300">
              منتج جديد
            </button>
          </div>
        </div>
        <div className=" overflow-scroll h-[68vh]">
          <PurchasesNewList></PurchasesNewList>
          {/* <CustomizedTables></CustomizedTables> */}
        </div>
        <div className="h-1/3">
          <PurchasesFotter></PurchasesFotter>
        </div>
      </div>
    </div>
  );
}

export default AddNewPurhaseList;
