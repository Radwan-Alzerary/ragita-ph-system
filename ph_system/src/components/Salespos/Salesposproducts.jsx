import React from "react";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { HeartBroken } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
function Salesposproducts(props) {
  const price = props.product.prices.find((element) =>
    element.packaging && element.packaging._id
      ? element.packaging._id
      : "" === props.product.defaultPackaging
  );
  return (
    <div className="block max-w-sm h-36 relative border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 bg-white dark:border-gray-200  ">
      <VaccinesIcon
        className="w-full"
        onClick={() => {
          props.onClick(props.productId);
        }}
        style={{ fontSize: 70, width: "100%" }}
      ></VaccinesIcon>

      <p
        onClick={() => {
          props.onClick(props.productId);
        }}
        class="mb-2 text-xl font-bold tracking-tight text-gray-900 "
      >
        {props.name}
      </p>
      <div
        onClick={() => props.handleMakeFavoriteClick(props.productId)}
        className=" absolute top-0 right-0 rounded-tr-lg h-8 w-8 flex justify-center items-center"
      >
        {!props.favorite ? (
          <FavoriteBorderIcon className="text-red-500"></FavoriteBorderIcon>
        ) : (
          <FavoriteIcon className="text-red-500"></FavoriteIcon>
        )}
      </div>
      <div
        onClick={() => {
          props.onClick(props.productId);
        }}
        className=" bg-slate-50 absolute bottom-0 left-0 rounded-b-lg w-full"
      >
        <p class="font-normal text-black text-center">
          {price && price.singlePrice ? price.singlePrice : ""} دع{" "}
        </p>
        <div className="flex gap-2 justify-center items-center">
          <p class="font-normal text-center text-black text-sm opacity-80">
            {price && price.quantity ? price.quantity : ""}
          </p>
          <p class="font-normal text-center text-black text-sm opacity-80">
            {price && price.packaging.name ? price.packaging.name : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Salesposproducts;
