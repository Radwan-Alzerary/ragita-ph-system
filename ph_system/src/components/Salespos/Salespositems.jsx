import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect } from "react";
import SalesNestedPackage from "./SalesNestedPackage";
import { useState } from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { IconButton } from "@mui/material";
import { Add, BackHand, Minimize, Repartition } from "@mui/icons-material";
function Salespositems(props) {
  const [packageSelet, setPackageSelet] = useState(false);
  const [productInfo, setProductInfo] = useState(
    props.product.pricesWithDefaultPackage.product
  );
  const [returnedProduct, setReturnedProduct] = useState(false);
  const invoiceData = props.invoiceData.returnProduct || [];

  useEffect(() => {
    if (invoiceData) {
      const returned = invoiceData.find(
        (invo) => invo.id === productInfo.id._id
      );
      if (returned) {
        setReturnedProduct(true);
      } else {
        setReturnedProduct(false);
      }
    } else {
      setReturnedProduct(false);
    }
  }, [props.invoiceData]);
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
  }, [props.product]);
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return "..." + text.slice(0, maxLength);
  };

  return (
    <>
      {!loading ? (
        <tr
          class={` border-b ${
            returnedProduct ? " bg-orange-200 " : ""
          }  dark:bg-white dark:border-gray-300 cursor-pointer text-black  dark:hover:bg-gray-100`}
        >
          <td class=" text-center w-12">
            {producPackagetInfo && producPackagetInfo.singlePrice
              ? productInfo.price ? productInfo.price : producPackagetInfo.singlePrice * productInfo.quantity
              : 0 * productInfo.quantity}
          </td>
          <td class="px-2 text-center w-12">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                direction: "ltr",
                justifyItems: "center",
              }}
            >
              {!returnedProduct ? (
                <IconButton
                  onClick={() => {
                    const newQuantity = Math.max(0, productInfo.quantity - 1);
                    props.updateProductQuantity(newQuantity, props.productId);
                  }}
                >
                  <HorizontalRuleIcon className="text-red-500" />
                </IconButton>
              ) : (
                ""
              )}

              <input
                className="w-5 text-center bg-transparent"
                value={productInfo.quantity}
                onChange={(e) => {
                  props.updateProductQuantity(e.target.value, props.productId);
                }}
              />
              {!returnedProduct ? (
                <IconButton
                  onClick={() => {
                    const newQuantity = productInfo.quantity + 1;
                    props.updateProductQuantity(newQuantity, props.productId);
                  }}
                >
                  <Add className=" text-green-500"></Add>
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </td>
          <td class=" text-center w-12">
            {producPackagetInfo && producPackagetInfo.singlePrice
              ? producPackagetInfo.singlePrice
              : 0}
          </td>
          <td class=" text-center w-12 relative">
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
                  : "لا يوجد"}
              </p>
            </div>
            {packageSelet ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center h-24 z-50">
                <div className="fixed flex  justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 h-1/3 bg-white p-5 rounded-xl z-50">
                  {productPackageType.map((nestedPackage, index) => (
                    <div className=" w-full">
                      <SalesNestedPackage
                        onClick={() => {
                          props.onPackageChange(
                            nestedPackage.packaging._id,
                            props.productId
                          );
                          setPackageSelet(!packageSelet);
                          // setPackageSelet(!packageSelet);
                        }}
                        nestedPackage={nestedPackage}
                      ></SalesNestedPackage>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </td>
          <td class=" py-2 text-center w-12">
            {" "}
            {productInfo.id.countery
              ? truncateText(productInfo.id.countery.name, 5)
              : "غير معروف"}
          </td>

          <th
            scope="row"
            class=" py-2 text-center font-medium w-full  whitespace-nowrap "
          >
            <div className="flex flex-col">
              <a>{truncateText(productInfo.id.name.tradeName, 10)}</a>
              <a className=" text-green-500">
                {truncateText(productInfo.id.name.scientificName, 10)}
              </a>
            </div>
          </th>
          <td class=" text-centertext-right">
            <p class="font-medium hover:underline flex gap-2">
              {props.selectedRequestQueue ? (
                props.selectedRequestQueue.type === "edit" ? (
                  <div className=" text-orange-900 flex p-0.5 hover:bg-orange-200 cursor-pointer  rounded-full">
                    <IconButton
                      onClick={() => {
                        props.itemRerutnClickHanlde(productInfo.id._id);
                      }}
                    >
                      <Repartition className=" text-orange-500"></Repartition>
                    </IconButton>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {!returnedProduct ? (
                <div className=" text-red-900 flex p-0.5 hover:bg-red-200 cursor-pointer  rounded-full">
                  <IconButton
                    size="small"
                    onClick={() => {
                      props.removeProducrInsideInvoice(productInfo.id._id);
                    }}
                  >
                    <DeleteForeverIcon className="text-red-600"></DeleteForeverIcon>
                  </IconButton>
                </div>
              ) : (
                ""
              )}
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
