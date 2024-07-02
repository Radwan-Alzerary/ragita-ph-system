import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDebtCard from "../../../components/saleDebt/UserDebtCard";
import axios from "axios";
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

const names = ["الاقدم", "الاحدث", "اكبر مبلغ", "اصغر مبلغ"];

function SaleDebt() {
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
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [costemersDept, setCostemerDept] = useState([]);
  const fetchData = async () => {
    try {
      const allInvoices = await getAllInvoice();
      setCostemerDept(allInvoices);
      console.log(allInvoices);
      // setLoading(false);
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  async function getAllInvoice() {
    try {
      const response = await axios.get(`${serverAddress}/costemers/getdepts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching storage data:", error);
      throw error;
    }
  }
  const handelDeptPayment = (id, amount) => {
    console.log(id, amount);
    axios
      .post(`${serverAddress}/costemers/debtPayment`, {
        customerId: id,
        amount: amount,
      })
      .then((response) => {
        fetchData()
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
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
              placeholder="البحث من خلال اسم الزبون"
            />

            <FormControl
              className=" bg-white"
              sx={{ width: "10%" }}
              size="small"
            >
              <InputLabel id="demo-multiple-name-label">تصنيف حسب</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {costemersDept
            ? costemersDept.map((dept) => (
                <UserDebtCard
                  handelDeptPayment={handelDeptPayment}
                  dept={dept}
                ></UserDebtCard>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default SaleDebt;
