import React from "react";
import Salesposproducts from "./Salesposproducts";
function Salesposproductscontainor(props) {
  const productList = [
  
  ];

  return (
    <div class="grid cursor-pointer grid-cols-6 p-3 h-full  overflow-scroll text-center gap-4">
      {props.products.map((product, index) => (
        <Salesposproducts
          handleMakeFavoriteClick={props.handleMakeFavoriteClick}
          onClick={props.onClick}
          key={product._id}
          favorite={product.favorite}
          productId={product._id}
          name={product.name.scientificName}
          product={product}
          // quantity={product.prices[0].singlePrice}
          // price={product.prices[0].singlePrice}
        />
      ))}
    </div>
  );
}

export default Salesposproductscontainor;
