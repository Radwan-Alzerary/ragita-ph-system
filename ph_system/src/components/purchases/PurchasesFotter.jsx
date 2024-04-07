import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { green } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton } from "@mui/material";
import PurchasesInput from "./PurchasesInput";

function PurchasesFotter(props) {
  return (
    <div className=" h-16 w-full bg-white ">
      <div className="flex items-center h-full justify-between ">
      <div className="flex w-[33%] gap-4 justify-center items-center ">
          <div>
            <button onClick={()=>{props.onFinishHandle()}}
              type="button"
              class="text-black w-full bg-green-400 hover:bg-green-500  font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
            >
              اكمال
            </button>
          </div>
          <div>
            <button
              type="button"
              class="text-black w-full bg-red-400 hover:bg-red-500 font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
            >
              الغاء
            </button>
          </div>
        </div>
        {/* <div className="w-[33%] flex justify-center items-center">
          <PurchasesInput title="الباركود" width={300}></PurchasesInput>
        </div> */}

        {/* <div className="flex w-[33%] gap-4 justify-center items-center ">
          <div>
            <button
              type="button"
              class="text-black w-full bg-blue-400 hover:bg-blue-500  font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
            >
              طباعة الراجعات
            </button>
          </div>
          <div>
            <button
              type="button"
              class="text-black w-full bg-blue-400 hover:bg-blue-500 font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
            >
              طباعة الفاتورة
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PurchasesFotter;
