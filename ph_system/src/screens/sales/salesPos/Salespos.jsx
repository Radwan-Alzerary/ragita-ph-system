import Salesposfooter from "../../../components/Salespos/Salesposfooter";
import Salesposproductconfig from "../../../components/Salespos/Salesposproductconfig";
import Salespositemtable from "../../../components/Salespos/Salespositemtable";
import Salesposprices from "../../../components/Salespos/Salesposprices";
import Salesposmainheader from "../../../components/Salespos/Salesposmainheader";
import Salespositemcategory from "../../../components/Salespos/Salespositemcategory";
import Salesposproductscontainor from "../../../components/Salespos/Salesposproductscontainor";
import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Calculate } from "@mui/icons-material";
import Calculator from "../../../components/Salespos/Calculator";
import BackGroundShadow from "../../../components/global/BackGroundShadow";
import ItemEditForm from "../../../components/Storgecomponents/allItem/ItemEditForm";
import SelectPackage from "../../../components/Salespos/SelectPackage";
import { useParams } from "react-router-dom";
import BackroundShadow from "../../../components/pageCompond/BackroundShadow";
import { Button, TextField } from "@mui/material";

function Salespos() {
  const { id } = useParams();
  const [pageRender, setPageRender] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [storeList, setStorgeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [requestQueue, setRequestQueue] = useState([]);
  const [paymentype, setPaymentype] = useState([]);
  const [costemers, setCostemers] = useState([]);
  const [products, setProducts] = useState([]);
  const [returnQuantity, setReturnQuantity] = useState(0);

  const [discountValue, setDiscountValue] = useState(0);
  const [currentRequestQueue, setCurrentRequestQueue] = useState("");
  const [RequestQueueProduct, setRequestQueueProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totallPrice, setTotallPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentypeSelect, setPaymentypeSelect] = useState();
  const [costemerNameInput, setCostemerNameInput] = useState("");
  const [costemerNumberInput, setCostemerNumberInput] = useState("");
  const [barcode, setBarcode] = useState("");
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [editingProduct, setEditingProduct] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [orginBarcode, setOrginBarcode] = useState("");
  const [showReturnScreen, setShowReturnScreen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [currentProductReturnData, setCurrentProductReturnData] = useState({});
  const barcodeRef = useRef("");
  const timeoutRef = useRef(null);

  const changePaymeny = (payment) => {
    handeNewPaymentType(payment);
    setPaymentypeSelect(payment);
  };
  const [selectedRequestQueue, setSelectedRequestQueue] = useState(null);

  // Update state when props.currentRequestQueue changes
  const fetchInvoiceData = async () => {
    // Find the request queue object that matches currentRequestQueue
    const foundRequestQueue = requestQueue.find(
      (queue) => queue._id === currentRequestQueue
    );
    console.log(foundRequestQueue)
    if (foundRequestQueue && foundRequestQueue.invoice[0]) {
      try {
        const response = await axios.get(
          `${serverAddress}/invoice/getOne/${foundRequestQueue.invoice[0]}`
        );
        if (response.data) {
          setInvoiceData(response.data);
          console.log(response.data)

        } else {
          setInvoiceData({});
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        setInvoiceData({}); // or handle error as needed
      }
    }

    setSelectedRequestQueue(foundRequestQueue);
  };

  useEffect(() => {
  
    fetchInvoiceData(); // Call the async function
  }, [currentRequestQueue]);

  const handleMakeFavoriteClick = (id) => {
    axios
      .post(`${serverAddress}/products/changefavorite`, {
        productId: id,
      })
      .then((response) => {
        handleGetAllItem();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const fetchData = async () => {
    try {
      const paymentTypeData = await getPaymentrypeApi();
      const storageData = await getStorgeApi();
      const categoryData = await getCatecotyApi();
      const requestQueueData = await GetRequestQueueApi();
      const customersData = await getCostemersApi();
      const productsData = await getproductsApi();
      const paymentDefault = await paymentTypeData.find(
        (item) => item.name === "نقدي"
      );
      setPaymentypeSelect(paymentDefault);
      setPaymentype(paymentTypeData);
      setStorgeList(storageData);
      setCategoryList(categoryData);
      setRequestQueue(requestQueueData);
      setCostemers(customersData);
      setProducts(productsData);
      if (id && !pageRender) {
        setPageRender(true);
        setCurrentRequestQueue(id);
      } else {
        if (requestQueueData[0]) {
          setCurrentRequestQueue(requestQueueData[0]._id);
        }
      }

      setLoading(false);
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function getStorgeApi() {
    try {
      const response = await axios.get(`${serverAddress}/storges/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching storage data:", error);
      throw error;
    }
  }
  async function getCatecotyApi() {
    try {
      const response = await axios.get(`${serverAddress}/categories/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
      throw error;
    }
  }
  async function GetRequestQueueApi() {
    try {
      const response = await axios.get(`${serverAddress}/requestqueue/getall`);

      // setSelectedCurrentRequestQueueData()
      return response.data;
    } catch (error) {
      console.error("Error fetching request queue data:", error);
      throw error;
    }
  }
  async function getPaymentrypeApi() {
    try {
      const response = await axios.get(`${serverAddress}/paymentype/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment types:", error);
      throw error;
    }
  }
  async function getproductsApi() {
    try {
      const response = await axios.get(`${serverAddress}/products/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  }
  async function getCostemersApi() {
    try {
      const response = await axios.get(`${serverAddress}/costemers/getall`);
      const customersData = response.data;

      // Check if the data is an object and convert it to an array if needed
      if (Array.isArray(customersData)) {
        // If the data is already an array, you can use it directly
        return customersData;
      } else if (typeof customersData === "object") {
        // If the data is an object, convert it to an array using Object.values
        return Object.values(customersData);
      } else {
        // Handle other data types accordingly
        console.error("Unexpected data format:", customersData);
        return null;
      }
    } catch (error) {
      console.error("Error fetching customers data:", error);
      throw error;
    }
  }
  const handleNewProduct = (categoryId) => {
    axios
      .get(`${serverAddress}/categories/getproducts/${categoryId}`)
      .then((response) => {
        setProducts(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleGetAllProduct = () => {
    axios
      .get(`${serverAddress}/products/getall`)
      .then((response) => {
        setProducts(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleDiscountValueChange = (event) => {
    if (event.target.value >= 0) {
      axios
        .post(`${serverAddress}/invoice/updateInvoiceDiscount`, {
          discount: event.target.value,
          RequestQueueId: currentRequestQueue,
        })
        .then((response) => {
          setDiscountValue(response.data.discount);
          setTotallPrice(response.data.fullPrice);
          setFinalPrice(response.data.finalprice);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  };
  const handleAmountPaidValueChange = (event) => {
    if (event.target.value >= 0) {
      axios
        .post(`${serverAddress}/invoice/updateInvoiceAmountPaid`, {
          amountPaid: event.target.value,
          RequestQueueId: currentRequestQueue,
        })
        .then((response) => {
          setAmountPaid(response.data.amountPaid);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  };
  const handleCostemerNameSelect = (value) => {
    setCostemerNameInput(value.name);
    setCostemerNumberInput(value.phoneNumber);
    handeNewCostemerName(value.name);
    handeNewCostemerPhoneNumber(value.phoneNumber);
  };
  const productInsideQuiue = useCallback(() => {
    if (currentRequestQueue)
      axios
        .get(`${serverAddress}/requestqueue/getproducts/${currentRequestQueue}`)
        .then((response) => {
          setDiscountValue(response.data.discount);
          setAmountPaid(response.data.amountPaid);
          setRequestQueueProduct(response.data.products); // Update the categories state with the fetched data



        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

  

  }, [currentRequestQueue]);

  useEffect(() => {
    productInsideQuiue();
  }, [productInsideQuiue, currentRequestQueue]);

  useEffect(() => {
    axios
      .get(
        `${serverAddress}/requestqueue/getCostemerValue/${currentRequestQueue}`
      )
      .then((response) => {
        setCostemerNameInput(response.data.currentUserName);
        setCostemerNumberInput(response.data.currentUserPhoneNumber);
        // setProducts(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get(
        `${serverAddress}/requestqueue/getPaymentValue/${currentRequestQueue}`
      )
      .then((response) => {
        setPaymentypeSelect(response.data.paymentType);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

  }, [currentRequestQueue]);

  const hangeNewQueue = () => {
    axios
      .post(`${serverAddress}/requestqueue/newqueue`, {})
      .then((response) => {
        axios
          .get(`${serverAddress}/requestqueue/getall`)
          .then((response) => {
            setRequestQueue(response.data); // Update the categories state with the fetched data
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleRequestQueue = (queueId) => {
    setCurrentRequestQueue(queueId);
  };

  const handleProductClick = (productId) => {
    axios
      .post(`${serverAddress}/invoice/addproduct`, {
        RequestQueueId: currentRequestQueue,
        productId: productId,
      })
      .then((response) => {
        productInsideQuiue();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const updateProductQuantity = (newQuantity, productId) => {
    axios
      .post(`${serverAddress}/invoice/newproductquantity`, {
        RequestQueueId: currentRequestQueue,
        quantity: newQuantity,
        productId: productId,
      })
      .then((response) => {
        productInsideQuiue();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const removeProducrInsideInvoice = (productId) => {
    axios
      .delete(
        `${serverAddress}/invoice/removeproduct/${currentRequestQueue}/product/${productId}`
      )
      .then((response) => {
        productInsideQuiue();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const viewProductData = (productId) => {
  };

  const onPackageChange = (packageId, productId) => {
    axios
      .post(`${serverAddress}/invoice/newProductPackage`, {
        RequestQueueId: currentRequestQueue,
        packageId: packageId,
        productId: productId,
      })
      .then((response) => {
        productInsideQuiue();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const onSearchHandle = (event) => {
    const searchInputValue = event.target.value;
    axios
      .get(`${serverAddress}/products/searchName/${searchInputValue}`)
      .then((response) => {
        setProducts(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleFavoriteClick = () => {
    axios
      .get(`${serverAddress}/products/favorite`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        throw error;
      });
  };

  const handleGetAllItem = () => {
    axios
      .get(`${serverAddress}/products/getall`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        throw error;
      });
  };

  const handleMostSellItem = () => {
    try {
      const response = axios.get(`${serverAddress}/products/getall`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const handeNewCostemerName = (costemersName) => {
    axios
      .post(`${serverAddress}/requestqueue/costemercurrentname`, {
        costemersName: costemersName,
        id: currentRequestQueue,
      })
      .then((response) => {
        setCostemerNameInput(costemersName);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handeNewPaymentType = (paymentType) => {
    axios
      .post(`${serverAddress}/requestqueue/paymentTypeUpdate`, {
        paymentType: paymentType._id,
        id: currentRequestQueue,
      })
      .then((response) => {
        // setCostemerNameInput(costemersName);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handeNewCostemerPhoneNumber = (phoneNumber) => {
    axios
      .post(`${serverAddress}/requestqueue/costemercurrentnumber`, {
        phoneNumber: phoneNumber,
        id: currentRequestQueue,
      })
      .then((response) => {
        setCostemerNumberInput(phoneNumber);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const onEditHandle = (id) => {
    axios
      .post(`${serverAddress}/products/getOne/`, { id: id })
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        setShowEditForm(true);

        setEditingProduct(response.data);

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

  };

  const updatePrice = (newPrice) => {
    axios
      .post(`${serverAddress}/invoice/updateInvoicePrice`, {
        fullPrice: newPrice,
        RequestQueueId: currentRequestQueue,
      })
      .then((response) => {
        setDiscountValue(response.data.discount);
        setTotallPrice(response.data.fullPrice);
        setFinalPrice(response.data.finalprice);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const finishHandleData = () => {
    axios
      .post(`${serverAddress}/requestqueue/finish`, {
        id: currentRequestQueue,
      })
      .then((response) => {
        productInsideQuiue();
        fetchData()
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const canceleHandleData = () => {
    axios
      .post(`${serverAddress}/requestqueue/cancele`, {
        id: currentRequestQueue,
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleBarcodeAdd = async (barcode) => {

    // Make a copy of the currentRequestQueue in a local variable
    const queueId = currentRequestQueue;

    try {
      const response = await axios.post(
        `${serverAddress}/invoice/addproductByBarcode`,
        {
          RequestQueueId: queueId, // Use the local variable instead
          barcode: barcode,
        }
      );
      productInsideQuiue();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (data) => {
    axios
      .post(`${serverAddress}/products/edit/`, {
        id: editingProduct._id,
        data: data,
      })
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        setShowEditForm(false);
        fetchData();

        setEditingProduct("");
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(
          `Error deleting category with ID ${editingProduct._id}:`,
          error
        );
      });
  };
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (barcodeRef.current !== "") {
          // Barcode scanned, handle it
          console.log("Barcode Scanned:", barcodeRef.current);
          setOrginBarcode(barcodeRef.current);
          handleBarcodeAdd(barcodeRef.current);
          barcodeRef.current = "";
          setBarcode("");
        }
      } else {
        // Key pressed, update barcode
        barcodeRef.current += event.key;
        setBarcode((prevBarcode) => prevBarcode + event.key);

        // Clear barcode after a delay if no additional key is pressed
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
      }
    },
    [handleBarcodeAdd]
  );
  timeoutRef.current = setTimeout(() => {
    barcodeRef.current = "";
    setBarcode("");
  }, 2000);

  useEffect(() => {
    const handleKeyPressEvent = (event) => handleKeyPress(event);
    window.addEventListener("keypress", handleKeyPressEvent);

    return () => {
      window.removeEventListener("keypress", handleKeyPressEvent);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  const OnRequestQuiueEditHandle = () => {
    axios
      .post(`${serverAddress}/requestqueue/edit`, {
        id: currentRequestQueue,
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const OnClicknRequestQuiueReturnHandle = () => {
    axios
      .post(`${serverAddress}/requestqueue/fullReturn`, {
        id: currentRequestQueue,
      })
      .then((response) => {
        productInsideQuiue();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const itemRerutnClickHanlde = (id) => {
    const currentReturnProduct = invoiceData.product.find(
      (product) => product.id._id.toString() === id
    );
    setCurrentProductReturnData(currentReturnProduct);
    setShowReturnScreen(true);
  };

  const handleCompleteProductReturnData = () => {

    axios
      .post(`${serverAddress}/requestqueue/returnProduct`, {
        productId: currentProductReturnData.id._id,
        invoiceId: invoiceData._id,
        returnQuantity: returnQuantity,
      })
      .then((response) => {
        fetchInvoiceData();
        productInsideQuiue();
        setShowReturnScreen(false);

      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <div className=" relative h-full ">
      {showCalculator ? (
        <Calculator
          handleHide={() => {
            setShowCalculator(false);
          }}
        ></Calculator>
      ) : (
        ""
      )}
      {!loading ? (
        <>
          {" "}
          <div className="flex h-full">
            <div className="w-[60%] h-[65vh] ">
              <Salesposmainheader
                onSearchHandle={onSearchHandle}
                handleGetAllItemClick={handleGetAllItem}
                handleFavoriteClick={handleFavoriteClick}
                handleMostSellItem={handleMostSellItem}
              ></Salesposmainheader>
              <Salespositemcategory
                categoryList={categoryList}
                handleNewProduct={handleNewProduct}
                getAllProduct={handleGetAllProduct}
              ></Salespositemcategory>
              <Salesposproductscontainor
                handleMakeFavoriteClick={handleMakeFavoriteClick}
                onClick={handleProductClick}
                products={products}
                onEditHandle={onEditHandle}
              ></Salesposproductscontainor>
            </div>
            <div className="w-[40%] p-1  absolute h-[83vh] left-0">
              {!loading && paymentype && storeList && costemers ? (
                <Salesposproductconfig
                  showCalculator={() => setShowCalculator(true)}
                  handleCostemerNameSelect={handleCostemerNameSelect}
                  requestQueue={requestQueue}
                  costemerNameInput={costemerNameInput}
                  paymentypeSelect={paymentypeSelect}
                  costemerNumberInput={costemerNumberInput}
                  handeNewCostemerPhoneNumber={handeNewCostemerPhoneNumber}
                  handeNewCostemerName={handeNewCostemerName}
                  storeList={storeList}
                  paymentype={paymentype}
                  changePaymeny={changePaymeny}
                  costemers={costemers}
                  onTextChange={(id) => {
                  }}
                ></Salesposproductconfig>
              ) : (
                ""
              )}
              <Salespositemtable
                selectedRequestQueue={selectedRequestQueue}
                updatePrice={updatePrice}
                products={RequestQueueProduct}
                viewProductData={viewProductData}
                itemRerutnClickHanlde={itemRerutnClickHanlde}
                onPackageChange={onPackageChange}
                removeProducrInsideInvoice={removeProducrInsideInvoice}
                updateProductQuantity={updateProductQuantity}
                invoiceData={invoiceData}
              ></Salespositemtable>
              <Salesposprices
                setDiscountValue={handleDiscountValueChange}
                discountValue={discountValue}
                handleAmountPaidValueChange={handleAmountPaidValueChange}
                amountPaid={amountPaid}
                paymentypeSelect={paymentypeSelect}
                paymentype={paymentype}
                totallPrice={totallPrice}
                finalPrice={finalPrice}
              ></Salesposprices>
            </div>
          </div>
          <Salesposfooter
            finish
            selectedRequestQueue={selectedRequestQueue}
            OnRequestQuiueEditHandle={OnRequestQuiueEditHandle}
            OnClicknRequestQuiueReturnHandle={OnClicknRequestQuiueReturnHandle}
            finishHandleData={finishHandleData}
            canceleHandleData={canceleHandleData}
            handleRequestQueue={handleRequestQueue}
            currentRequestQueue={currentRequestQueue}
            requestQueue={requestQueue}
            onNewQueue={hangeNewQueue}
          ></Salesposfooter>
        </>
      ) : (
        ""
      )}
      {showEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => setShowEditForm(false)}
          ></BackGroundShadow>
          <ItemEditForm
            handleEdit={handleEdit}
            editingProduct={editingProduct}
          ></ItemEditForm>
        </>
      ) : (
        ""
      )}
      {showReturnScreen ? (
        <>
          <BackroundShadow
            onClick={() => setShowReturnScreen(false)}
          ></BackroundShadow>
          <div className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 h-1/2 bg-white p-5 rounded-xl z-50">
            <div className="flex  justify-around w-full">
              {" "}
              <div className="flex flex-col justify-center items-center text-green-700">
                <p className="text-black">اسم المسترجع التجاري</p>
                {currentProductReturnData.id.name.tradeName}
              </div>
              <div className="flex flex-col justify-center items-center text-green-700">
                <p className="text-black">التعبئة المسترجعة</p>
                {currentProductReturnData.storageType.name}
              </div>
            </div>

            <div className="flex  justify-around w-full">
              <div className="flex flex-col justify-center items-center">
                <p>العدد الحالي</p>
                {currentProductReturnData.quantity}
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>المتبقي لدى الزبون</p>
                {currentProductReturnData.quantity - returnQuantity}{" "}
                {currentProductReturnData.storageType.name}
              </div>
            </div>

            <div className="w-[80%]">
              <TextField
                type="number"
                value={returnQuantity}
                onChange={(event) => {
                  const enteredValue = event.target.value;
                  if (enteredValue <= currentProductReturnData.quantity) {
                    setReturnQuantity(enteredValue);
                  } else {
                  }
                }}
                className=" w-full"
                style={{ width: "100%" }}
                inputProps={{
                  min: 0,
                  max: currentProductReturnData.quantity, // Set the max attribute for the input field
                }}
                label="عدد المسترجع"
                size="small"
              ></TextField>
            </div>
            <Button
              variant="outlined"
              color="success"
              style={{ width: "70%" }}
              onClick={() => {
                handleCompleteProductReturnData();
              }}
            >
              انتهاء
            </Button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Salespos;
