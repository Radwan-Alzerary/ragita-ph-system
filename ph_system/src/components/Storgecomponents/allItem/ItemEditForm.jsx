import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const dataToPush = {};

function ItemEditForm(props) {
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState("name");
  const [categoryList, setCategoryList] = useState([]);

  const [OutfittersList, setOutfittersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barcode, setBarcode] = useState("");

  const [manufactorList, setManufactorList] = useState([]);
  const [storeList, setStorgeList] = useState([]);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [name, setName] = useState({
    scientificName: props.editingProduct.name.scientificName,
    tradeName: props.editingProduct.name.tradeName,
    anotherName: props.editingProduct.name.anotherName,
  });
  const [specialCode, setSpecialCode] = useState(
    props.editingProduct.specialCode
  );
  const [specialBarcode, setSpecialBarcode] = useState(
    props.editingProduct.specialBarcode
  );
  const [manufacturBarcode, setManufacturBarcode] = useState(
    props.editingProduct.manufacturBarcode
  );

  const [specifications, setSpecifications] = useState({
    generalInformation: props.editingProduct.specifications.generalInformation,
    medicalInformation: props.editingProduct.specifications.medicalInformation,
    sideEffects: props.editingProduct.specifications.sideEffects,
    numberOfDoses: props.editingProduct.specifications.numberOfDoses,
    comments: props.editingProduct.specifications.comments,
  });
  const [orginBarcode, setOrginBarcode] = useState("");

  const [packages, setPackages] = useState(props.editingProduct.prices);
  console.log(packages);
  useEffect(() => {
    setCategoryName(props.name);
  }, [props.name]);
  const barcodeRef = useRef("");
  const timeoutRef = useRef(null);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (barcodeRef.current !== "") {
          console.log("Barcode Scanned:", barcodeRef.current);
          setOrginBarcode(barcodeRef.current);
          setManufacturBarcode(barcodeRef.current);
          barcodeRef.current = "";
          setBarcode("");
        }
      } else {
        barcodeRef.current += event.key;
        setBarcode((prevBarcode) => prevBarcode + event.key);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          barcodeRef.current = "";
          setBarcode("");
        }, 300);
      }
    },
    [setOrginBarcode]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {};
    FormData.name = name;
    FormData.specifications = specifications;
    FormData.specialCode = specialCode;
    FormData.prices = packages;
    FormData.manufacturBarcode = manufacturBarcode;
    props.handleEdit(FormData);
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

  const handleSpecificationsChange = (event) => {
    const { name, value } = event.target;
    setSpecifications((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSpecialCodeChange = (event) => {
    setSpecialCode(event.target.value);
  };

  const updateProperty = (index, propertyName, newValue) => {
    const newPackages = [...packages];
    newPackages[index][propertyName] = newValue;
    setPackages(newPackages);
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
          variant={currentPage === "barcode" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("barcode")}
          sx={{ flex: 1 }}
        >
          الباركود
        </Button>

        <Button
          variant={currentPage === "quantity" ? "contained" : "outlined"}
          onClick={() => setCurrentPage("quantity")}
          sx={{ flex: 1 }}
        >
          التعبئة
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
        <>
          <div>
            <TextField
              label="مواصفات مميزة"
              name="generalInformation"
              value={specifications.generalInformation}
              onChange={handleSpecificationsChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="مواصفات طبية"
              name="medicalInformation"
              value={specifications.medicalInformation}
              onChange={handleSpecificationsChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="الاعراض الجانبية"
              name="sideEffects"
              value={specifications.sideEffects}
              onChange={handleSpecificationsChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="الجرعة"
              name="numberOfDoses"
              value={specifications.numberOfDoses}
              onChange={handleSpecificationsChange}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="الملاحضات"
              name="comments"
              value={specifications.comments}
              onChange={handleSpecificationsChange}
              variant="outlined"
            />
          </div>
        </>
      )}

      {currentPage === "price" && (
        <div className="flex gap-3">
          {packages.map((packag, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <p>{packag.packaging.name}</p>
              <div>
                <p>سعر بيع المفرد</p>
                <TextField
                  onChange={(event) =>
                    updateProperty(index, "singlePrice", event.target.value)
                  }
                  value={packag.singlePrice}
                />
              </div>
              <div>
                <p>سعر بيع الجملة</p>
                <TextField
                  onChange={(event) =>
                    updateProperty(index, "wholesalePrice", event.target.value)
                  }
                  value={packag.wholesalePrice}
                />
              </div>
              <div>
                <p>سعر بيع الخاص</p>
                <TextField
                  onChange={(event) =>
                    updateProperty(index, "specialPrice", event.target.value)
                  }
                  value={packag.specialPrice}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {currentPage === "quantity" && (
        <div className="flex gap-6">
          {packages.map((packag, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <p>{packag.packaging.name}</p>
              <div>
                <p>الكمية</p>
                <TextField
                  value={packag.quantity}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {currentPage === "barcode" && (
        <div className="flex gap-6">
          <div className="text-center">
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={specialBarcode ? specialBarcode : ""}
              viewBox={`0 0 256 256`}
            />
            {specialBarcode}
          </div>
          <div className="text-center">
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={manufacturBarcode ? manufacturBarcode : ""}
              viewBox={`0 0 256 256`}
            />
            {manufacturBarcode}
          </div>
        </div>
      )}

      {currentPage === "productSeles" && <div></div>}

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
