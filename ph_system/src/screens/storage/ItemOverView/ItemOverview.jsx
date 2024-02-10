import axios from "axios";
import React, { useEffect, useState } from "react";

function ItemOverview() {
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

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      console.log(response)
      setter(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5000/products/total/', setTotalProducts);
    fetchData('http://localhost:5000/products/favorites/', setFavoriteProducts);
    fetchData('http://localhost:5000/products/expiring-in-three-months/', setExpiringInThreeMonths);
    fetchData('http://localhost:5000/products/expiring-in-one-month/', setExpiringInOneMonth);
    fetchData('http://localhost:5000/products/expired/', setExpiredProducts);
    fetchData('http://localhost:5000/products/without-barcode/', setProductsWithoutBarcode);
    fetchData('http://localhost:5000/products/without-category/', setProductsWithoutCategory);
    fetchData('http://localhost:5000/products/low-quantity-100/', setLowQuantity100);
    fetchData('http://localhost:5000/products/low-quantity-20/', setLowQuantity20);
    fetchData('http://localhost:5000/products/low-quantity-10/', setLowQuantity10);
    fetchData('http://localhost:5000/products/low-quantity-5/', setLowQuantity5);
    fetchData('http://localhost:5000/products/negative-quantity/', setOutOfStockProducts);
  }, []); // Empty dependency array means this effect runs once on component mount

  
  return (
    <div>
      <div className=" text-center text-2xl font-semibold w-full py-3">
        نضرة عامة
      </div>
      <div className="flex gap-3 w-full p-4">
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className="  font-bold text-2xl">المواد المضافة</div>
          <div className=" font-bold text-3xl text-green-800">{totalProducts}</div>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className=" font-bold text-2xl">المفضله</div>
          <div className=" font-bold text-3xl text-green-800">{favoriteProducts}</div>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className=" font-bold text-2xl">المضافة حديثا</div>
          <div className=" font-bold text-3xl text-green-800">0</div>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className=" font-bold text-2xl">المواد غير المصنفة</div>
          <div className=" font-bold text-3xl text-green-800">{productsWithoutCategory}</div>
        </div>
        <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/5 bg-white flex flex-col justify-center items-center rounded-xl">
          <div className=" font-bold text-2xl">المواد بدون باركود</div>
          <div className=" font-bold text-3xl text-green-800">{productsWithoutBarcode}</div>
        </div>
      </div>
      <div className="flex p-4 gap-4">
        <div className="h-full w-1/3 justify-center items-center">
          <div className=" text-center text-2xl font-semibold">الكمية</div>
          <div className="flex gap-4 my-4">
            <div className=" cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">اكثر من 100 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">{lowQuantity100}</div>
            </div>
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">اقل من 20 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">{lowQuantity20}</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">اقل من 10 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">{lowQuantity10}</div>
            </div>
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-1/2 bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">اقل من 5 قطعة</div>
              <div className=" font-bold text-2xl text-green-800">{lowQuantity5}</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">نافذ</div>
              <div className=" font-bold text-2xl text-green-800">{outOfStockProducts}</div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 justify-center items-center">
          <div className=" text-center text-2xl font-semibold">الصلاحية</div>
          <div className="flex gap-4 my-4">
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">انتهاء بعد اقل من 3 أشهر</div>
              <div className=" font-bold text-2xl text-green-800">{expiringInThreeMonths}</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">انتهاء بعد اقل من شهر</div>
              <div className=" font-bold text-2xl text-green-800">{expiringInOneMonth}</div>
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="cursor-pointer hover:bg-slate-200 h-24 w-full bg-white flex flex-col justify-center items-center rounded-xl">
              <div className=" font-bold text-xl">منتهية الصلاحية</div>
              <div className=" font-bold text-2xl text-green-800">{expiredProducts}</div>
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
    </div>
  );
}

export default ItemOverview;
