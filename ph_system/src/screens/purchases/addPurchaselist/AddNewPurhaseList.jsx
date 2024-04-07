import React, { useEffect, useState } from "react";
import { PurchasesAutoComplet } from "../../../components/purchases/PurchasesAutoComplet";
import PurchasesInput from "../../../components/purchases/PurchasesInput";
import PurchasesNewList from "../../../components/purchases/PurchasesNewList";
import Salesposfooter from "../../../components/Salespos/Salesposfooter";
import PurchasesFotter from "../../../components/purchases/PurchasesFotter";
import CustomizedTables from "../../../components/purchases/xx";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function AddNewPurhaseList() {
  const [storeList, setStorgeList] = useState([]);

  const [OutfittersList, setOutfittersList] = useState([]);

  const [manufactorList, setManufactorList] = useState([]);
  const [paymentype, setPaymentype] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchasesInvoice, setPurchasesInvoice] = useState([]);

  const [loading, setLoading] = useState(true);

  async function getStorgeApi() {
    try {
      const response = await axios.get("http://localhost:5000/storges/getall");
      return response.data;
    } catch (error) {
      console.error("Error fetching storage data:", error);
      throw error;
    }
  }
  async function getPaymentrypeApi() {
    try {
      const response = await axios.get(
        "http://localhost:5000/paymentype/getall"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching payment types:", error);
      throw error;
    }
  }
  async function getproductsApi() {
    try {
      const response = await axios.get("http://localhost:5000/products/getall");
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  }
  async function getOutfittersApi() {
    try {
      const response = await axios.get(
        "http://localhost:5000/outfitters/getall"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  }
  async function Initializ() {
    try {
      const response = await axios.get(
        "http://localhost:5000/purchases/Initializ"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching storage data:", error);
      throw error;
    }
  }

  const fetchData = async () => {
    try {
      const initializ = await Initializ();
      const paymentTypeData = await getPaymentrypeApi();
      const storageData = await getStorgeApi();
      const productsData = await getproductsApi();
      const OutfittersData = await getOutfittersApi();
      setPurchasesInvoice(initializ);
      setPaymentype(paymentTypeData);
      setStorgeList(storageData);
      setProducts(productsData);
      setOutfittersList(OutfittersData);
      setLoading(false);
      console.log(purchasesInvoice);
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };

  const handlePurchaseListValue = (type, value) => {
    axios
      .post("http://localhost:5000/purchases/ubdateCurrent", {
        type: type,
        value: value,
        id: purchasesInvoice._id,
      })
      .then((response) => {
        setPurchasesInvoice(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOnAddNewItem = (productId) => {
    axios
      .post("http://localhost:5000/purchases/addproduct", {
        productId: productId,
        id: purchasesInvoice._id,
      })
      .then((response) => {
        setPurchasesInvoice(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleProductInsideInvoiceChange = (type, productId, value) => {
    axios
      .post("http://localhost:5000/purchases/ProductInsideInvoiceChange", {
        type: type,
        productId: productId,
        id: purchasesInvoice._id,
        value: value,
      })
      .then((response) => {
        setPurchasesInvoice(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


const onFinishHandle = ()=>{
  axios
  .post("http://localhost:5000/purchases/finish", {
    id: purchasesInvoice._id,
  })
  .then((response) => {
    window.location.reload()
    console.log("Response:", response.data);
  })
  .catch((error) => {
    window.location.reload()

    console.error("Error:", error);
  });
};


  const handleProductRemove = (id) => {
    console.log(id);
    axios
      .post("http://localhost:5000/purchases/removeProductInsideInvoice", {
        productId: id,
        PurchasesId: purchasesInvoice._id,
      })
      .then((response) => {
        setPurchasesInvoice(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      {!loading ? (
        <div className="flex flex-col">
          <div className=" bg-white p-4 shadow my-2 h-[14vh]">
            <div className="w-full flex  items-center justify-around gap-4">
              <TextField
                label={"رقم الوصل"}
                size="small"
                variant="outlined"
                value={purchasesInvoice.invoiceNum}
                onChange={(event) => {
                  handlePurchaseListValue("invoiceNum", event.target.value);
                }}
                sx={{
                  width: 170,
                  direction: "rtl",
                  textAlign: "right",
                }}
              ></TextField>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={OutfittersList}
                size="small"
                freeSolo
                onChange={(event, newValue) => {
                  handlePurchaseListValue("outfitters", newValue._id);
                }}
                getOptionLabel={(option) => option.name}
                defaultValue={OutfittersList.find(
                  (outfitter) => outfitter._id === purchasesInvoice.outfitters
                )}
                value={OutfittersList.find(
                  (outfitter) => outfitter._id === purchasesInvoice.outfitters
                )}
                sx={{
                  width: 170,
                  direction: "rtl",
                  textAlign: "right",
                  color: "#fff",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"المذخر"}
                    variant="outlined"
                    color="warning"
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(purchasesInvoice.invoiceDate)}
                  onChange={(newValue) => {
                    console.log(newValue.$d);
                    handlePurchaseListValue("invoiceDate", newValue.$d);
                  }}
                />
              </LocalizationProvider>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={paymentype}
                size="small"
                freeSolo
                onChange={(event, newValue) => {
                  handlePurchaseListValue("PaymentType", newValue._id);

                  // setDataValue("storge", newValue);
                }}
                getOptionLabel={(option) => option.name}
                value={paymentype.find(
                  (payment) => payment._id === purchasesInvoice.PaymentType
                )}
                sx={{
                  width: 170,
                  direction: "rtl",
                  textAlign: "right",
                  color: "#fff",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"نوع الدفع"}
                    variant="outlined"
                    color="warning"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={storeList}
                size="small"
                freeSolo
                onChange={(event, newValue) => {
                  // setDataValue("storge", newValue);
                  handlePurchaseListValue("storge", newValue._id);
                  console.log(newValue);
                }}
                getOptionLabel={(option) => option.name}
                value={storeList.find(
                  (payment) => payment._id === purchasesInvoice.storge
                )}
                sx={{
                  width: 170,
                  direction: "rtl",
                  textAlign: "right",
                  color: "#fff",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"المخزن"}
                    variant="outlined"
                    color="warning"
                  />
                )}
              />
              <button className="w-24 h-8 bg-green-400 rounded-lg hover:bg-green-300">
                منتج جديد
              </button>
            </div>
          </div>
          <div className=" overflow-scroll h-[68vh]">
            <PurchasesNewList
              products={products}
              handleProductInsideInvoiceChange={
                handleProductInsideInvoiceChange
              }
              handleProductRemove={handleProductRemove}
              purchasesInvoice={purchasesInvoice}
            ></PurchasesNewList>
            {/* <CustomizedTables></CustomizedTables> */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products}
              size="small"
              freeSolo
              onChange={(event, newValue) => {
                // handlePurchaseListValue("PaymentType", newValue._id);

                // setDataValue("storge", newValue);
                if (newValue) {
                  console.log(newValue);
                  handleOnAddNewItem(newValue._id);
                }
              }}
              getOptionLabel={(option) => option.name.tradeName}
              sx={{
                width: "100%",
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"اضافة منتج"}
                  variant="outlined"
                  color="warning"
                />
              )}
            ></Autocomplete>
          </div>
          <div className="h-1/3">
            <PurchasesFotter onFinishHandle= {onFinishHandle}></PurchasesFotter>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddNewPurhaseList;
