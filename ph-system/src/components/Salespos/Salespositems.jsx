import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect } from "react";
import SalesNestedPackage from "./SalesNestedPackage";
import { useState } from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { IconButton } from "@mui/material";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import { Add, Minimize } from "@mui/icons-material";
function Salespositems(props) {
  const [packageSelet, setPackageSelet] = useState(false);
  const [productInfo, setProductInfo] = useState(
    props.product.pricesWithDefaultPackage.product
  );
  const [producPackagetInfo, setProducPackagetInfo] = useState(
    props.product.pricesWithDefaultPackage.pricesWithDefaultPackage[0]
  );
  const [productPackageType, setProductPackageType] = useState(
    props.product.pricesWithDefaultPackage.product.id.prices
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setProductInfo(() => props.product.pricesWithDefaultPackage.product);
    setProducPackagetInfo(
      () => props.product.pricesWithDefaultPackage.pricesWithDefaultPackage[0]
    );
    setProductPackageType(
      () => props.product.pricesWithDefaultPackage.product.id.prices
    );
    setLoading(false);
    // console.log("props.product");
    // console.log("props.product");
  }, [props.product]);
  return (
    <>
      {!loading ? (
        <tr class=" border-b dark:bg-white dark:border-gray-300 cursor-pointer text-black  dark:hover:bg-gray-100">
          <td class="px-2 text-center w-12">
            {producPackagetInfo && producPackagetInfo.singlePrice
              ? producPackagetInfo.singlePrice
              : 0 * productInfo.quantity}
          </td>
          <td class="px-2 text-center w-12">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                direction: "ltr",
              }}
            >
              <IconButton
                onClick={() => {
                  const newQuantity = Math.max(0, productInfo.quantity - 1);
                  props.updateProductQuantity(newQuantity, props.productId);
                }}
              >
                <HorizontalRuleIcon className="text-red-500" />
              </IconButton>
              <input
                className="w-5 text-center bg-transparent"
                value={productInfo.quantity}
                onChange={(e) => {
                  props.updateProductQuantity(e.target.value, props.productId);
                }}
              />
              <IconButton
                onClick={() => {
                  const newQuantity = productInfo.quantity + 1;
                  props.updateProductQuantity(newQuantity, props.productId);
                }}
              >
                <Add className=" text-green-500"></Add>
              </IconButton>
            </div>
          </td>
          <td class="px-3 text-center w-12">
            {producPackagetInfo && producPackagetInfo.singlePrice
              ? producPackagetInfo.singlePrice
              : 0}
          </td>
          <td class="px-3 text-center w-12 relative">
            <div
              className="w-12 overflow-auto cursor-pointer"
              onClick={() => {
                setPackageSelet(!packageSelet);
              }}
            >
              <p className="w-auto">
                {producPackagetInfo &&
                producPackagetInfo.packaging &&
                producPackagetInfo.packaging.name
                  ? producPackagetInfo.packaging.name
                  : ""}
              </p>
            </div>
            {packageSelet ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center h-24 z-50">
                {productPackageType.map((nestedPackage, index) => (
                  <SalesNestedPackage
                    onClick={() => {
                      // console.log(nestedPackage.packaging._id, props.productId);
                      props.onPackageChange(
                        nestedPackage.packaging._id,
                        props.productId
                      );
                      setPackageSelet(!packageSelet);
                      // setPackageSelet(!packageSelet);
                    }}
                    nestedPackage={nestedPackage}
                  ></SalesNestedPackage>
                ))}
              </div>
            ) : (
              ""
            )}
          </td>
          <td class="px-3 py-2 text-center w-12">
            {" "}
            {productInfo.id.country ? productInfo.id.country.name : "غير معروف"}
          </td>

          <th
            scope="row"
            class="px-3 py-2 text-center font-medium w-full  whitespace-nowrap "
          >
            {productInfo.id.name.tradeName}
          </th>

          <td class="px-3 py-2 text-centertext-right">
            <p class="font-medium hover:underline flex gap-2">
              <div className=" text-green-700 p-0.5 hover:bg-blue-200 cursor-pointer  rounded-full">
                <IconButton
                  size="small"
                  onClick={() => {
                    props.viewProductData(productInfo.id._id);
                  }}
                >
                  <RemoveRedEyeIcon className="text-blue-600"></RemoveRedEyeIcon>
                </IconButton>
              </div>
              <div className=" text-green-700 p-0.5 hover:bg-red-200 cursor-pointer  rounded-full">
                <IconButton
                  size="small"
                  onClick={() => {
                    props.viewProductData(productInfo.id._id);
                  }}
                >
                  <LowPriorityIcon className="text-red-300"></LowPriorityIcon>
                </IconButton>
              </div>

              <div className=" text-red-900  p-0.5 hover:bg-red-200 cursor-pointer  rounded-full">
                <IconButton
                  size="small"
                  onClick={() => {
                    props.removeProducrInsideInvoice(productInfo.id._id);
                  }}
                >
                  <DeleteForeverIcon className="text-red-600"></DeleteForeverIcon>
                </IconButton>
              </div>
            </p>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}

export default Salespositems;
