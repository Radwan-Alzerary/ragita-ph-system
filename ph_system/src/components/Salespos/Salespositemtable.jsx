import React, { useEffect, useState } from "react";
import Salespositems from "./Salespositems";

const Salespositemtable = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // console.log(props);
    if (props.products) {
      let newTotalPrice = 0;
      props.products.forEach((product) => {
        newTotalPrice +=
          (product.pricesWithDefaultPackage &&
          product.pricesWithDefaultPackage.pricesWithDefaultPackage[0] &&
          product.pricesWithDefaultPackage.pricesWithDefaultPackage[0]
            .singlePrice
            ? product.pricesWithDefaultPackage.pricesWithDefaultPackage[0]
                .singlePrice
            : 0) * product.pricesWithDefaultPackage.product.quantity;
      });
      props.updatePrice(newTotalPrice);
      setTotalPrice(newTotalPrice);
    }
  }, [props.products]);
  useEffect(() => {
    // console.log(totalPrice);
  }, [totalPrice]);
  return (
    <div class="relative overflow-x-auto h-[60%]">
      <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs  text-black uppercase bg-gray-200 dark:text-black">
          <tr>
            <th scope="col" class=" text-center">
              الكلي
            </th>
            <th scope="col" class="text-center">
              العدد
            </th>
            <th scope="col" class=" text-center">
              السعر
            </th>
            <th scope="col" class=" text-center">
              التعبئة
            </th>

            <th scope="col" class="px-2 py-3 text-center">
              المنشأ
            </th>

            <th scope="col" class="px-2 py-3 text-center">
              الاسم
            </th>
            <th scope="col" class="px-2 py-3 text-center">
              <span class="">الخيارات</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.products
            ? props.products.map((product, index) => (
                <Salespositems
                invoiceData={props.invoiceData}
                  selectedRequestQueue={props.selectedRequestQueue}
                  itemRerutnClickHanlde={props.itemRerutnClickHanlde}
                  key={product.pricesWithDefaultPackage.product.id._id}
                  productId={product.pricesWithDefaultPackage.product.id._id}
                  updateProductQuantity={props.updateProductQuantity}
                  onPackageChange={props.onPackageChange}
                  product={product}
                  removeProducrInsideInvoice={props.removeProducrInsideInvoice}
                ></Salespositems>
              ))
            : "no item"}
        </tbody>
      </table>
    </div>
  );
};

export default Salespositemtable;
