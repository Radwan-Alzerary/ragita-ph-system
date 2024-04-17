import Salesposfooter from "../../../components/Salespos/Salesposfooter";
import Salesposproductconfig from "../../../components/Salespos/Salesposproductconfig";
import Salespositemtable from "../../../components/Salespos/Salespositemtable";
import Salesposprices from "../../../components/Salespos/Salesposprices";
import Salesposmainheader from "../../../components/Salespos/Salesposmainheader";
import Salespositemcategory from "../../../components/Salespos/Salespositemcategory";
import Salesposproductscontainor from "../../../components/Salespos/Salesposproductscontainor";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Calculate } from "@mui/icons-material";
import Calculator from "../../../components/Salespos/Calculator";

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check for a special character (e.g., Enter) to determine the end of the barcode
      if (event.key === "Enter") {
        // Do something with the barcode data (e.g., send it to a server)
        if (barcode !== "") {
          console.log("Barcode Scanned:", barcode);
          handleBarcodeAdd(barcode);
          // setOrginBarcode(barcode);
          setBarcode("");
        }
      } else {
        // Append the scanned character to the barcode string
        setBarcode(barcode + event.key);
      }
    };
    setTimeout(() => {
      setBarcode("");
    }, 20);

    // Add an event listener to capture keyboard input
    window.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [barcode]);

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
      const response = await axios.get(
        `${serverAddress}/categories/getall`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
      throw error;
    }
  }
  async function GetRequestQueueApi() {
    try {
      const response = await axios.get(
        `${serverAddress}/requestqueue/getall`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching request queue data:", error);
      throw error;
    }
  }
  async function getPaymentrypeApi() {
    try {
      const response = await axios.get(
        `${serverAddress}/paymentype/getall`
      );
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
      const response = await axios.get(
       `${serverAddress}/costemers/getall`
      );
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
        .get(
          `${serverAddress}/requestqueue/getproducts/${currentRequestQueue}`
        )
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

  const handleBarcodeAdd = (barcode) => {
    axios
      .post(`${serverAddress}/invoice/addproductByBarcode`, {
        RequestQueueId: currentRequestQueue,
        barcode: barcode,
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
    </div>
  );
}

export default Salespos;
