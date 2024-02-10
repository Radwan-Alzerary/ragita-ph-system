import React, { useEffect, useState } from "react";
import ItemCategory from "../../../components/Storgecomponents/ItemType/ItemCategory";
import ItemInCategory from "../../../components/Storgecomponents/ItemType/ItemInCategory";
import AddCategoryForm from "../../../components/Storgecomponents/ItemType/AddCategoryForm";
import BackroundShadow from "../../../components/pageCompond/BackroundShadow";
import axios from "axios"; // Use a lowercase 'axios'

function ItemType() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [products, setProducts] = useState([]); // State to hold products

  const hideAddCategoryForm = () => {
    console.log("x");
    setShowCategoryForm(!showCategoryForm);
  };

  const showAddCategoryForm = () => {
    setShowCategoryForm(true);
  };

  const handleCategoryClick = (category) => {
    // Clear the products state when clicking a new category
    setProducts([]);

    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);

      // Fetch products for the selected category by its ID
      axios
        .get(`http://localhost:5000/categories/getproduct/${category.id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    // Send a DELETE request to the server to delete the category by ID
    axios
      .delete(`http://localhost:5000/categories/delete/${categoryId}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(`Category with ID ${categoryId} has been deleted.`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${categoryId}:`, error);
      });
  };

  useEffect(() => {
    console.log("xcxxx")
    axios
      .get("http://localhost:5000/categories/getall")
      .then((response) => {
        setCategories(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const handleAddNewCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  const handleEditCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <div className="w-full h-full relative overflow-scroll my p-4">
      {showCategoryForm ? (
        <>
          <BackroundShadow onClick={hideAddCategoryForm}></BackroundShadow>
          <AddCategoryForm editing={false}  onAdd={handleAddNewCategory}></AddCategoryForm>
        </>
      ) : null}

      <div className="w-full mb-6 h-10">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  "
            placeholder="البحث في المجاميع"
            required
          ></input>
        </div>
      </div>
      <div className="w-full ">
        {categories.map((category) => (
          <ItemCategory
            key={category._id} // Make sure to use a unique key for each item
            id={category._id}
            title={category.name}
            onClick={() => handleCategoryClick(category.name)}
            onEdit={handleEditCategory}
            onDelete={() => handleDeleteCategory(category._id)}
            // onEdit={() => handleEditCategory(category.id)}
          ></ItemCategory>
        ))}

        {/* Conditionally render ItemInCategory based on selectedCategory */}
        {selectedCategory && (
          <ItemInCategory category={selectedCategory} products={products} />
        )}

        <div
          onClick={showAddCategoryForm}
          className="w-full h-12 bg-green-300 p-4 flex justify-center rounded-lg cursor-pointer hover:bg-green-200 items-center"
        >
          <p>اضافة جديد</p>
        </div>
      </div>
    </div>
  );
}

export default ItemType;
