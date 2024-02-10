import { Edit, Money } from "@mui/icons-material";
import React from "react";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { Button, IconButton } from "@mui/material";
import { green, red } from "@mui/material/colors";
function UserDebtCard() {
  return (
    <div className="w-52 min-h-52 h-72 rounded-xl bg-white p-2 relative">
      <div>
        <p className=" text-center text-lg font-bold m-0">احمد محمد ياسر</p>
        <p className=" text-center text-base">07703385350</p>
      </div>
      <hr></hr>

      <div>
        <p className=" text-center text-4xl font-bold my-1 text-red-500">
          200,000
        </p>
      </div>
      <hr></hr>

      <div class="relative h-28 overflow-x-auto ">
        <table class="w-full text-sm text-left text-gray-500 mt-4 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className=" text-center">
                المبلغ
              </th>

              <th scope="col" className=" text-center">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody >
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
              <td className="text-center text-xs">4000</td>
              <td className="text-center text-xs">2023/2/1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full absolute bottom-0 border border-t-1 h-12 left-0 rounded flex justify-center items-center gap-4">
        <button
          type="button"
          class=" bg-green-400 hover:bg-green-500  font-medium rounded text-sm px-5 py-2.5 text-center  "
        >
          تسديد كامل
        </button>

        <button
          type="button"
          class=" bg-red-400 hover:bg-red-500  font-medium rounded text-sm px-5 py-2.5 text-center  "
        >
          تسديد جزء
        </button>
      </div>
    </div>
  );
}

export default UserDebtCard;
