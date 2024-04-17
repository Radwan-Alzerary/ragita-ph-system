import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../itemsList/Item";
import BackGroundShadow from "../../../components/global/BackGroundShadow";

function ItemOverview() {
  const [product, setProduct] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [expiringInThreeMonths, setExpiringInThreeMonths] = useState([]);
  const [expiringInOneMonth, setExpiringInOneMonth] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [productsWithoutBarcode, setProductsWithoutBarcode] = useState([]);
  const [productsWithoutCategory, setProductsWithoutCategory] = useState([]);
  const [lowQuantity100, setLowQuantity100] = useState([]);
  const [lowQuantity20, setLowQuantity20] = useState([]);
  const [lowQuantity10, setLowQuantity10] = useState([]);
  const [lowQuantity5, setLowQuantity5] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [productData, setProductData] = useState([]);
  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setter(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000

  useEffect(() => {
    fetchData(`${serverAddress}/products/total/`, setTotalProducts);
    fetchData(`${serverAddress}/products/getall/`, setProduct);
    fetchData(`${serverAddress}/products/favorites/`, setFavoriteProducts);
    fetchData(
      `${serverAddress}/products/expiring-in-three-months/`,
      setExpiringInThreeMonths
    );
    fetchData(
      `${serverAddress}/products/expiring-in-one-month/`,
      setExpiringInOneMonth
    );
    fetchData(`${serverAddress}/products/expired/`, setExpiredProducts);
    fetchData(
      `${serverAddress}/products/without-barcode/`,
      setProductsWithoutBarcode
    );
    fetchData(
      `${serverAddress}/products/without-category/`,
      setProductsWithoutCategory
    );
    fetchData(
      `${serverAddress}/products/low-quantity-100/`,
      setLowQuantity100
    );
    fetchData(
      `${serverAddress}/products/low-quantity-20/`,
      setLowQuantity20
    );
    fetchData(
      `${serverAddress}/products/low-quantity-10/`,
      setLowQuantity10
    );
    fetchData(
      `${serverAddress}/products/low-quantity-5/`,
      setLowQuantity5
    );
    fetchData(
      `${serverAddress}/products/negative-quantity/`,
      setOutOfStockProducts
    );
  }, []); // Empty dependency array means this effect runs once on component mount
  const onDeleteHandle = (id) => {
    console.log(id);
    axios
      .delete(`${serverAddress}/products/delete/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        fetchData(`${serverAddress}/products/total/`, setProductData);

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        fetchData(`${serverAddress}/products/total/`, setProductData);

        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };

  return (
    <div>
      <div className=" text-center text-2xl font-semibold w-full py-3">
        نضرة عامة
      </div>
      <div className="flex gap-3 w-full p-4">
        <div
          onClick={() => {
            setShowProduct(true);
            setProductData(totalProducts);
          }}
          className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl"
        >
          <div className="  font-bold text-2xl">المواد المضافة</div>
          <div className=" font-bold text-3xl text-green-800">
            {totalProducts ? totalProducts.length : ""}
          </div>
        </div>
        <div
          onClick={() => {
            setShowProduct(true);
            setProductData(favoriteProducts);
          }}
          className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl"
        >
          <div className=" font-bold text-2xl">المفضله</div>
          <div className=" font-bold text-3xl text-green-800">
            {favoriteProducts.length}
          </div>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className=" font-bold text-2xl">المضافة حديثا</div>
          <div className=" font-bold text-3xl text-green-800">0</div>
        </div>
        <div
          onClick={() => {
            setShowProduct(true);
            setProductData(productsWithoutCategory);
          }}
          className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl"
        >
          <div className=" font-bold text-2xl">المواد غير المصنفة</div>
          <div className=" font-bold text-3xl text-green-800">
            {productsWithoutCategory.length}
          </div>
        </div>
        <div
          onClick={() => {
            setShowProduct(true);
            setProductData(productsWithoutBarcode);
          }}
          className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl"
        >
          <div className=" font-bold text-2xl">المواد بدون باركود</div>
          <div className=" font-bold text-3xl text-green-800">
            {productsWithoutBarcode.length}
          </div>
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <div className="h-full w-1/3 justify-center items-center">
          <div className=" text-center text-2xl font-semibold">الكمية</div>
          <div className="flex gap-4 my-4">
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(lowQuantity100);
              }}
              className=" cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">اكثر من 100 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">
                {lowQuantity100.length}
              </div>
            </div>
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(lowQuantity20);
              }}
              className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">اقل من 20 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">
                {lowQuantity20.length}
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setShowProduct(true);
              setProductData(lowQuantity10);
            }}
            className="flex gap-4 my-4"
          >
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">اقل من 10 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">
                {lowQuantity10.length}
              </div>
            </div>
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(lowQuantity5);
              }}
              className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">اقل من 5 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">
                {lowQuantity5.length}
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setShowProduct(true);
              setProductData(outOfStockProducts);
            }}
            className="flex gap-4 my-4"
          >
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">نافذ</div>
              <div className=" font-bold text-2xl text-green-800">
                {outOfStockProducts.length}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 justify-center items-center">
          <div className=" text-center text-2xl font-semibold">الصلاحية</div>
          <div className="flex gap-4 my-4">
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(expiringInThreeMonths);
              }}
              className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">انتهاء بعد اقل من 3 أشهر</div>
              <div className=" font-bold text-2xl text-green-800">
                {expiringInThreeMonths.length}
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(expiringInOneMonth);
              }}
              className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">انتهاء بعد اقل من شهر</div>
              <div className=" font-bold text-2xl text-green-800">
                {expiringInOneMonth.length}
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div
              onClick={() => {
                setShowProduct(true);
                setProductData(expiredProducts);
              }}
              className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl"
            >
              <div className=" font-bold text-xl">منتهية الصلاحية</div>
              <div className=" font-bold text-2xl text-green-800">
                {expiredProducts.length}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 justify-center items-center">
          <div className=" text-center text-2xl font-semibold">الجرد</div>
          <div className="flex gap-4 my-4">
            <div className=" hover:bg-slate-200 cursor-pointer h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">المواد الاكثر مبيعا</div>
            </div>
            <div className=" hover:bg-slate-200 cursor-pointer h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">المواد الاقل مبيعا</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className=" hover:bg-slate-200 cursor-pointer h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">المواد الاكثر ربحا</div>
            </div>
            <div className=" hover:bg-slate-200 cursor-pointer h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">المواد الاقل ربحا</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="hover:bg-slate-100 cursor-pointer h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">المواد الاكثر ترجيعا</div>
            </div>
          </div>
        </div>
      </div>
      {showProduct ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowProduct(false);
            }}
          ></BackGroundShadow>
          <Item onDeleteHandle={onDeleteHandle} product={productData}></Item>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ItemOverview;
