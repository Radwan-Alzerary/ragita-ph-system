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

function Salespos() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [storeList, setStorgeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [requestQueue, setRequestQueue] = useState([]);
  const [paymentype, setPaymentype] = useState([]);
  const [costemers, setCostemers] = useState([]);
  const [products, setProducts] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [currentRequestQueue, setCurrentRequestQueue] = useState("");
  const [RequestQueueProduct, setRequestQueueProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totallPrice, setTotallPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [amountPaidLeft, setAmountPaidLeft] = useState(0);
  const [paymentypeSelect, setPaymentypeSelect] = useState();
  const [costemerNameInput, setCostemerNameInput] = useState("");
  const [costemerNumberInput, setCostemerNumberInput] = useState("");
  const [barcode, setBarcode] = useState("");
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [editingProduct, setEditingProduct] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [orginBarcode, setOrginBarcode] = useState("");
  console.log(currentRequestQueue);
  const barcodeRef = useRef("");
  const timeoutRef = useRef(null);

  const changePaymeny = (payment) => {
    console.log(payment);
    handeNewPaymentType(payment);
    setPaymentypeSelect(payment);
  };
  const handleMakeFavoriteClick = (id) => {
    // console.log(id);
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
      console.log(requestQueueData);
      console.log(requestQueueData);
      console.log(requestQueueData);
      if (requestQueueData[0]) {
        setCurrentRequestQueue(requestQueueData[0]._id);
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
    // console.log(event.target.value)
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
    // console.log(event.target.value)
  };
  const handleCostemerNameSelect = (value) => {
    console.log(value);
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
          console.log(response.data);
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
        console.log(response.data);
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
        console.log(response.data);
        setPaymentypeSelect(response.data.paymentType);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    console.log("xxx");
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
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
    console.log(queueId);
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
    // console.log(productId);
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
    // console.log(packageId, productId);
  };

  const onSearchHandle = (event) => {
    const searchInputValue = event.target.value;
    // console.log(searchInputValue);
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
    console.log(phoneNumber);
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
    console.log(id);
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

    console.log(`Delete clicked for id ${id}`);
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
    console.log(barcode);

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
    console.log(data);
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
              {!loading &&
              paymentype &&
              // paymentype.length !== 0 &&
              // storeList.length !== 0 &&
              storeList &&
              costemers ? (
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
                    // console.log(id);
                  }}
                ></Salesposproductconfig>
              ) : (
                ""
              )}
              <Salespositemtable
                updatePrice={updatePrice}
                products={RequestQueueProduct}
                viewProductData={viewProductData}
                onPackageChange={onPackageChange}
                removeProducrInsideInvoice={removeProducrInsideInvoice}
                updateProductQuantity={updateProductQuantity}
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
    </div>
  );
}

export default Salespos;
