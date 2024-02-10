import { Delete, Edit, PrintOutlined, RemoveRedEye } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";
import DateRangePickerComp from "../../global/DateRangePickerComp";
import { useState } from "react";
import { useEffect } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function PurchaseList() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [range, setRange] = useState([
    {
      //   startDate: new Date(),
      //   endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  useEffect(() => {
    console.log(range);
  }, [range]);

  return (
    <div class="w-full h-full overflow-auto p-6">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <div class="flex items-center justify-between pb-4">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div class="flex gap-5 w-full mt-3">
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="البحث من خلال اسم المذخر"
            />

            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-multiple-name-label">
                تصنيف حسب نوع الدفع
              </InputLabel>

              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={""}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-multiple-name-label">
                تصنيف حسب الحالة
              </InputLabel>

              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={""}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DateRangePickerComp
              range={range}
              setRange={(rangeValue) => {
                setRange(rangeValue);
              }}
            ></DateRangePickerComp>
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs overflow-auto text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" class="text-center px-6 py-3">
                رقم وصل الشراء
              </th>
              <th scope="col" class="text-center px-6 py-3">
                اسم المذخر
              </th>

              <th scope="col" class="text-center px-6 py-3">
                مجموع المواد
              </th>
              <th scope="col" class="text-center px-6 py-3">
                مجموع السعر
              </th>
              <th scope="col" class="text-center px-6 py-3">
                الهدايا
              </th>

              <th scope="col" class="text-center px-6 py-3">
                الحالة
              </th>
              <th scope="col" class="text-center px-6 py-3">
                نوع الدفع
              </th>
              <th scope="col" class="text-center px-6 py-3">
                المسدد من الدفع
              </th>
              <th scope="col" class="text-center px-6 py-3">
                كمية المسترجع
              </th>

              <th scope="col" class="text-center px-6 py-3">
                الخيارات
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b ">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
              >
                1
              </th>
              <td class="text-center px-6 py-2">مذخر الاخلاص</td>
              <td class="text-center px-6 py-2">30</td>
              <td class="text-center px-6 py-2">200000</td>
              <td class="text-center px-6 py-2">3</td>
              <td class="text-center px-6 py-2 flex justify-center items-center">
                <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                  تسديد كامل
                </div>
              </td>
              <td class="text-center px-6 py-2">نقدي</td>
              <td class="text-center px-6 py-2">200000</td>

              <td class="text-center px-6 py-2">2023/2/1</td>
              <td class="flex items-center justify-center gap-2 px-6 py-2">
                <IconButton>
                  <Edit></Edit>
                </IconButton>
                <IconButton>
                  <Delete></Delete>
                </IconButton>
                <IconButton>
                  <RemoveRedEye></RemoveRedEye>
                </IconButton>
                <IconButton>
                  <PrintOutlined></PrintOutlined>
                </IconButton>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav
        aria-label="Page navigation example flex justify-center items-center"
        className=" absolute bottom-6 left-1/2 right-1/2"
      >
        <ul class="flex items-center -space-x-px h-10 text-base justify-center">
          <li className=" cursor-pointer">
            <p
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </p>
          </li>
          <li className=" cursor-pointer">
            <p
              id="page<%=i%>"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              1{" "}
            </p>
          </li>
          <li className=" cursor-pointer">
            <p
              id="page<%=i%>"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              2{" "}
            </p>
          </li>

          <li className="cursor-pointer">
            <p
              href="#"
              class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PurchaseList;
