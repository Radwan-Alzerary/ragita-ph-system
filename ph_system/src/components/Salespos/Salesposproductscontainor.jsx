import React from "react";
import Salesposproducts from "./Salesposproducts";
function Salesposproductscontainor(props) {
  const productList = [
    { id: 0, name: "الكل", quantity: 0, price: 0 },
    { id: 1, name: "ليسينوبريل", quantity: 10, price: 8000 },
    { id: 2, name: "ميتفورمين", quantity: 8, price: 5500 },
    { id: 3, name: "دونيبيزيل", quantity: 15, price: 9000 },
    { id: 4, name: "فيتامين C", quantity: 20, price: 12000 },
    { id: 5, name: "أملوديبين", quantity: 5, price: 4500 },
    { id: 6, name: "أتورفاستاتين", quantity: 12, price: 7000 },
    { id: 7, name: "ايبوبروفين", quantity: 7, price: 3500 },
    { id: 8, name: "لوفاستاتين", quantity: 3, price: 10000 },
    { id: 9, name: "بريغابالين", quantity: 18, price: 6000 },
    { id: 10, name: "لوراتادين", quantity: 9, price: 4500 },
    { id: 11, name: "سيتالوبرام", quantity: 6, price: 8500 },
    { id: 12, name: "هيدروكسي كلوروكوين", quantity: 14, price: 5500 },
    { id: 13, name: "جليميبرايد", quantity: 11, price: 7000 },
    { id: 14, name: "بنزوكاين", quantity: 22, price: 2500 },
    { id: 15, name: "فوروزمايد", quantity: 4, price: 5000 },
    { id: 16, name: "بيتاهستين", quantity: 17, price: 4000 },
    { id: 17, name: "كلوبيتازول", quantity: 13, price: 3200 },
    { id: 18, name: "دوكسيسايكلين", quantity: 10, price: 5500 },
    { id: 19, name: "فوريسيمايد", quantity: 8, price: 6000 },
    { id: 20, name: "أكسيتومينوفين", quantity: 25, price: 2800 },
    { id: 21, name: "إينالابريل", quantity: 3, price: 7500 },
    { id: 22, name: "مونتيلوكاست", quantity: 16, price: 4500 },
    { id: 23, name: "سيرترالين", quantity: 9, price: 4800 },
    { id: 24, name: "فاموتيدين", quantity: 12, price: 4000 },
    { id: 25, name: "ليفوتيروكسين", quantity: 6, price: 3000 },
    { id: 26, name: "رانيتيدين", quantity: 14, price: 6200 },
    { id: 27, name: "بيسوبرولول", quantity: 7, price: 5500 },
    { id: 28, name: "لوسارتان", quantity: 19, price: 3200 },
    { id: 29, name: "إسيتالوبرام", quantity: 5, price: 4800 },
    { id: 30, name: "ترامادول", quantity: 11, price: 4000 },
    { id: 31, name: "باروكستين", quantity: 8, price: 5500 },
    { id: 32, name: "ميبيكاربين", quantity: 15, price: 2800 },
    { id: 33, name: "سيترالين", quantity: 4, price: 3500 },
    { id: 34, name: "إيبوبروفين", quantity: 20, price: 4800 },
    { id: 35, name: "ميلوكسيكام", quantity: 9, price: 6000 },
    { id: 36, name: "سيمفاستاتين", quantity: 12, price: 3500 },
    { id: 37, name: "فلوكونازول", quantity: 6, price: 4500 },
    { id: 38, name: "كلونازيبام", quantity: 14, price: 5500 },
    { id: 39, name: "إيتوريكوكسيب", quantity: 7, price: 4800 },
    { id: 40, name: "أولميسارتان", quantity: 18, price: 6000 },
    { id: 41, name: "أوميبرازول", quantity: 5, price: 5500 },
    { id: 42, name: "بروبانولول", quantity: 10, price: 4000 },
    { id: 43, name: "جابابنتين", quantity: 9, price: 4800 },
    { id: 44, name: "فارينيكلين", quantity: 6, price: 3000 },
    { id: 45, name: "ريمونابانت", quantity: 13, price: 2000 },
    { id: 46, name: "فينيلفرين", quantity: 15, price: 4200 },
    { id: 47, name: "سالميترول", quantity: 8, price: 5500 },
    // Add more categories as needed
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
