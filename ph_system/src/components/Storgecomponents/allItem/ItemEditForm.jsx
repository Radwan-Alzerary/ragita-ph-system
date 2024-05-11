import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditMainInfo from "./EditMainInfo";
const dataToPush = {};

function ItemEditForm(props) {
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState("name");
  const [categoryList, setCategoryList] = useState([]);

  const [OutfittersList, setOutfittersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [manufactorList, setManufactorList] = useState([]);
  const [storeList, setStorgeList] = useState([]);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [name, setName] = useState({
    scientificName: props.editingProduct.name.scientificName,
    tradeName: props.editingProduct.name.tradeName,
    anotherName: props.editingProduct.name.anotherName,
  });
  const [specialCode, setSpecialCode] = useState("");

  useEffect(() => {
    setCategoryName(props.name);
  }, [props.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {}
    FormData.name = name
    FormData.specialCode = specialCode

    props.handleEdit(FormData)
    console.log(e);
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

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle changes in the special code field
  const handleSpecialCodeChange = (event) => {
    setSpecialCode(event.target.value);
  };

  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between w-full">
        <Button
          variant={currentPage === "name" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("name")}
          sx={{ flex: 1 }}
        >
          المعلومات الرئيسية
        </Button>
        <Button
          variant={currentPage === "info" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("info")}
          sx={{ flex: 1 }}
        >
          المعلومات الصحية
        </Button>
        <Button
          variant={currentPage === "price" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("price")}
          sx={{ flex: 1 }}
        >
          معلومات السعر
        </Button>
        <Button
          variant={currentPage === "productSeles" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("productSeles")}
          sx={{ flex: 1 }}
        >
          حركة المادة
        </Button>

      </div>

      {currentPage === "name" && (
        <>
          {!loading && storeList.length !== 0 ? (
            <div className=" w-3/5 h-full gap-7 bg-white shadow rounded-xl flex flex-col justify-center px-4 items-center ">
              <div>
                <TextField
                  label="الاسم العلمي"
                  name="scientificName"
                  value={name.scientificName}
                  onChange={handleNameChange}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  label="الاسم التجاري"
                  name="tradeName"
                  value={name.tradeName}
                  onChange={handleNameChange}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  label="اسماء اخرى"
                  name="anotherName"
                  value={name.anotherName}
                  onChange={handleNameChange}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  label="رمز مميز"
                  name="specialCode"
                  value={specialCode}
                  onChange={handleSpecialCodeChange}
                  variant="outlined"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}

      {currentPage === "info" && (
        // Render info page content here
        <div>
          {/* <TextField
            label="المعلومات الطبية"
            sx={{ width: "100%", direction: "rtl", textAlign: "right" }}
            // Add appropriate value and onChange handlers
          /> */}
        </div>
      )}

      {currentPage === "price" && (
        // Render price page content here
        <div>
          {/* <TextField
            label="معلومات السعر"
            sx={{ width: "100%", direction: "rtl", textAlign: "right" }}
            // Add appropriate value and onChange handlers
          /> */}
        </div>
      )}
      {currentPage === "productSeles" && (
        // Render price page content here
        <div>
          {/* <TextField
            label="حركة المادة"
            sx={{ width: "100%", direction: "rtl", textAlign: "right" }}
            // Add appropriate value and onChange handlers
          /> */}
        </div>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: "100%" }}
      >
        تعديل
      </Button>
    </form>
  );
}

export default ItemEditForm;
