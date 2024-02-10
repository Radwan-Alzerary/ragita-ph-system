import React, { useEffect } from "react";

function ItemInCategory({ category,products }) {
  // Replace this data with your actual item data
  useEffect(()=>{
    console.log(products)
  },[])
  const items = [
    { id: 1, name: "Item 1", category: "محمد احمد" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "محمد احمد" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 1, name: "Item 1", category: "ادوية طبيه" },
    { id: 2, name: "Item 2", category: "ادوية طبيه" },
    { id: 3, name: "Item 3", category: "مخدرات" },
  ];

  // Filter items based on the selected category
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <div className="item-list-container">
      <h2>قائمة العناصر في الفئة: {category}</h2>
      <div className=" flex gap-3 flex-wrap">
        {filteredItems.map((item) => (
          <div className="w-36 h-36  bg-white hover:opacity-60 cursor-pointer rounded-lg flex flex-col justify-center items-center">
            <p key={item.id}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemInCategory;
