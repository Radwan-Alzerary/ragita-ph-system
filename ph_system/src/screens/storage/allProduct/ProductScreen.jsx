import { IconButton, Input, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemInTable from "../../../components/Storgecomponents/allItem/ItemInTable";
import { Search } from "@mui/icons-material";
import ItemEditForm from "../../../components/Storgecomponents/allItem/ItemEditForm";
import BackGroundShadow from "../../../components/global/BackGroundShadow";

function ProductScreen() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [OutfittersList, setOutfittersList] = useState([]);

  const [manufactorList, setManufactorList] = useState([]);
  const [storeList, setStorgeList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };
  const fetchDataFromApi = async (apiUrl, setData) => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error);
    }
  };

  useEffect(() => {
    fetchDataFromApi(`${serverAddress}/storges/getall`, setStorgeList);
    fetchDataFromApi(`${serverAddress}/categories/getall`, setCategoryList);
    fetchDataFromApi(`${serverAddress}/outfitters/getall`, setOutfittersList);
    fetchDataFromApi(`${serverAddress}/manufactor/getall`, setManufactorList);
    setLoading(false);
  }, []);

  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const fetchData = async () => {
    try {
      const productsData = await getproductsApi();
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function getproductsApi() {
    try {
      const response = await axios.get(`${serverAddress}/products/total`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  }
  const onDeleteHandle = (id) => {
    console.log(id);
    axios
      .delete(`${serverAddress}/products/delete/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        fetchData(`${serverAddress}/products/total/`, setProducts);

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        fetchData(`${serverAddress}/products/total/`, setProducts);

        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };
  const onSearchHandle = (event) => {
    const searchInputValue = event.target.value;
    // console.log(searchInputValue);
    axios
      .get(`${serverAddress}/products/searchName/${searchInputValue}`)
      .then((response) => {
        setProducts(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const onEditHandle = (id) => {
    console.log(id);
    axios
      .post(`${serverAddress}/products/getOne/`, { id: id })
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        setShowEditForm(true);

        setEditingProduct(response.data);

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };

  const handleEdit = (data) => {
    console.log(data);
    axios
      .post(`${serverAddress}/products/edit/`, {
        id: editingProduct._id,
        data: data,
      })
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        setShowEditForm(false);
        fetchData();

        setEditingProduct("");
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${editingProduct._id}:`, error);
      });
  };

  return (
    <div>
      <div
        class="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ direction: "ltr" }}
      >
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownRadio"
              class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="top"
            >
              <ul
                class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    {/* <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> */}
                    <label
                      for="filter-radio-example-1"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last day
                    </label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    {/* <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> */}
                    <label
                      for="filter-radio-example-2"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last 7 days
                    </label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    {/* <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> */}
                    <label
                      for="filter-radio-example-3"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last 30 days
                    </label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    {/* <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> */}
                    <label
                      for="filter-radio-example-4"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last month
                    </label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    {/* <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> */}
                    <label
                      for="filter-radio-example-5"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last year
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center pl-3">
            <div className="flex bg-white px-4 h-12  rounded-xl w-full shadow">
              <InputBase
                onChange={onSearchHandle}
                sx={{ ml: 1, flex: 1 }}
                size="small"
                placeholder="البحث عن منتج"
                inputProps={{ "aria-label": "البحث عن منتج" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            {/* <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"> */}
          </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 text-center">
                الاسم التجاري
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                الاسم العلمي
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                الشركة المصنعة
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                البلد
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                التخزين الافتراضي
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                سعر الشراء
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                سعر بيع المفرد
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                الكمية في المخزن
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                تاريخ انتهاء الصلاحية
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                حذف
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                تعديل
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading
              ? products.map((product, index) => (
                  <ItemInTable
                    onDeleteHandle={onDeleteHandle}
                    onEditHandle={onEditHandle}
                    row={product}
                  ></ItemInTable>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      {showEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => setShowEditForm(false)}
          ></BackGroundShadow>
          <ItemEditForm
            handleEdit={handleEdit}
            editingProduct={editingProduct}
          ></ItemEditForm>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductScreen;
