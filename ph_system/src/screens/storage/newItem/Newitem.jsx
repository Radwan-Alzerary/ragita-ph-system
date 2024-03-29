import React, { useEffect } from "react";
import NewItemFotter from "../../../components/Storgecomponents/Additem/NewItemFotter";
import ItemPackage from "../../../components/Storgecomponents/Additem/ItemPackage";
import ItemPackageEmpty from "../../../components/Storgecomponents/Additem/ItemPackageEmpty";
import ItemPackageNested from "../../../components/Storgecomponents/Additem/ItemPackageNested";
import ItemMainInfo from "../../../components/Storgecomponents/Additem/ItemMainInfo";
import ItemExpire from "../../../components/Storgecomponents/Additem/ItemExpire";
import ItemImage from "../../../components/Storgecomponents/Additem/ItemImage";
import ItemSecondryInfo from "../../../components/Storgecomponents/Additem/ItemSecondryInfo";
import ItemQrCode from "../../../components/Storgecomponents/Additem/ItemQrCode";
import axios from "axios";

import { useState } from "react";
const packageNestedData = {};

function RenderData({
  data,
  numberOfDivs,
  setNumberOfDivs,
  onDataCaptureFromNested,
  onFillingChange,
  setDefultPackage,
  defaultPackage,
  pcakageFillingInside,
  purchasingPrice,
  onUnactiveHande,
}) {
  // Function to handle updates from the nested component.
  const updateNestedInfo = (
    packageId,
    packagingValue,
    singlePriceValue,
    singleProfitValue,
    wholesalePriceValue,
    wholesaleProfitValue,
    specialPriceValue,
    specialProfitValue,
    checked,
    totallPackageInside,
  ) => {
    // Check if the packageId already exists in the data
    if (packageNestedData.hasOwnProperty(packageId)) {
      // If it exists, update the data for that packageId
      packageNestedData[packageId] = {
        packagingValue,
        singlePriceValue,
        singleProfitValue,
        wholesalePriceValue,
        wholesaleProfitValue,
        specialPriceValue,
        specialProfitValue,
        totallPackageInside,
      };
    } else {
      // If it doesn't exist, create a new entry for that packageId
      packageNestedData[packageId] = {
        packagingValue,
        singlePriceValue,
        singleProfitValue,
        wholesalePriceValue,
        wholesaleProfitValue,
        specialPriceValue,
        specialProfitValue,
        totallPackageInside,
      };
    }
    console.log(packageNestedData);
  };
  // useEffect to update the number of divs.
  useEffect(() => {
    if (numberOfDivs > 1) {
      setNumberOfDivs(numberOfDivs - 1);
    }
  }, [numberOfDivs, setNumberOfDivs]);

  return (
    <>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <ItemPackageNested
          pcakageFillingInside={pcakageFillingInside}
            setDefultPackage={setDefultPackage}
            defaultPackage={defaultPackage}
            onFillingChange={onFillingChange}
            purchasingPrice={purchasingPrice}
            updateNestedInfo={updateNestedInfo}
            packageId={item.id}
            onUnactiveHande={onUnactiveHande}
            key={`nested-${item._id}`}
            name={item.name}
            filling={item.fillings}
          />

          {item.children.length > 0 && (
            <RenderData
              pcakageFillingInside={pcakageFillingInside}
              setDefultPackage={setDefultPackage}
              defaultPackage={defaultPackage}
              onFillingChange={onFillingChange}
              purchasingPrice={purchasingPrice}
              data={item.children}
              setNumberOfDivs={setNumberOfDivs}
              onUnactiveHande={onUnactiveHande}
              onDataCaptureFromNested={onDataCaptureFromNested}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
const dataToPush = {};
function NewItem() {
  const [packageNestedList, setPackageNestedList] = useState([]);
  const [numberOfDivs, setNumberOfDivs] = useState(3); // Initialize with a default value of 5
  const [defaultPackage, setDefaultPackage] = useState("");
  const [purchasingPrice, setPurchasingPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [orginBarcode, setOrginBarcode] = useState("");
  const [generatedBarcode, setGeneratedOrginBarcode] = useState("");
  const [storeList, setStorgeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [manufactorList, setManufactorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unActivePackage, setUnActivePackage] = useState([]);
  const [pcakageFillingInside,setPackageFillingInside]=useState()
  const onFillingChange = (id, value) => {
    console.log(id, value);
    axios
    .post("http://localhost:5000/packages/getPackageFillingForChild", {id:id,fillingValue:value,currentPackage : packageNestedData})
    .then((response) => {
      setPackageFillingInside(response.data.result.childFill)
      console.log("POST request successful:", response.data.result.childFill);
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
  };

  const fetchDataFromApi = async (apiUrl, setData) => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error);
    }
  };

  const generateRandomId = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < 13; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomId += charset[randomIndex];
    }
    return randomId;
  };

  useEffect(() => {
    fetchDataFromApi("http://localhost:5000/storges/getall", setStorgeList);
    fetchDataFromApi(
      "http://localhost:5000/categories/getall",
      setCategoryList
    );
    fetchDataFromApi(
      "http://localhost:5000/manufactor/getall",
      setManufactorList
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check for a special character (e.g., Enter) to determine the end of the barcode
      if (event.key === "Enter") {
        // Do something with the barcode data (e.g., send it to a server)
        if (barcode !== "") {
          console.log("Barcode Scanned:", barcode);
          setOrginBarcode(barcode);
          setBarcode("");
        }
      } else {
        // Append the scanned character to the barcode string
        setBarcode(barcode + event.key);
      }
    };
    setTimeout(() => {
      setBarcode("");
    }, 20);

    // Add an event listener to capture keyboard input
    window.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [barcode]);

  const onTextChange = (selectedId, selectedName) => {
    console.log(selectedId);
    console.log(selectedName);
    dataToPush.mainPackage = selectedId;
    axios
      .get(`http://localhost:5000/packages/getnested/${selectedId}`)
      .then((response) => {
        for (let key in packageNestedData) {
          delete packageNestedData[key];
        }
        // setManufactorList(response.data); // Update the categories state with the fetched data
        setDefaultPackage(response.data[0].id);
        setPackageNestedList(response.data);
        console.log(packageNestedList);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  };

  const setDefultPackage = (id) => {
    setDefaultPackage(id);
  };

  const updateMainInfo = (data) => {
    dataToPush.scientificName = data.productSeincsName;
    dataToPush.tradeName = data.productTradeName;
    dataToPush.anotherName = data.productAnotherName;
    dataToPush.specialCode = data.productSpesialCode;
    dataToPush.category = data.productCategory;
    dataToPush.storge = data.storge._id;
    dataToPush.manufactor = data.productManufactory;
    dataToPush.countery = data.productCountery;
  };

  const updateSecondaryInfo = (
    generalInformation,
    medicalInformation,
    sideEffects,
    numberOfDoses,
    comments
  ) => {
    dataToPush.generalInformation = generalInformation;
    dataToPush.medicalInformation = medicalInformation;
    dataToPush.sideEffects = sideEffects;
    dataToPush.numberOfDoses = numberOfDoses;
    dataToPush.comments = comments;
  };

  const updateItemPackageInfo = (purchasingPrice, lessamount, rackNumber) => {
    setPurchasingPrice(purchasingPrice);
    dataToPush.purchasingPrice = purchasingPrice;
    dataToPush.lessamount = lessamount;
    dataToPush.rackNumber = rackNumber;
  };

  const updateExpireInfo = (expireMonth, expireYear) => {
    dataToPush.expireMonth = expireMonth;
    dataToPush.expireYear = expireYear;
  };

  const SubmintHandle = (event) => {
    dataToPush.packageNestedData = packageNestedData;
    dataToPush.orginBarcode = orginBarcode;
    dataToPush.generatedBarcode = generatedBarcode;
    dataToPush.defaultPackage = defaultPackage;
    dataToPush.unActivePackage = unActivePackage;
    console.log(dataToPush)
    event.preventDefault();
    // Make a single POST request with all the data
    axios
      .post("http://localhost:5000/products/add", dataToPush)
      .then((response) => {
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  const onUnactiveHande = (id) => {
    if (unActivePackage.includes(id)) {
      // Data is already in the array, so remove it
      const updatedArray = unActivePackage.filter((item) => item !== id);
      setUnActivePackage(updatedArray);
    } else {
      // Data is not in the array, so add it
      const updatedArray = [...unActivePackage, id];
      setUnActivePackage(updatedArray);
    }
  };

  useEffect(() => {
    console.log(unActivePackage);
  }, [unActivePackage]);
  return (
    <form className=" h-full relative" onSubmit={SubmintHandle}>
      <div className="flex w-full gap-6  px-4 py-1">
        {!loading && storeList.length !== 0 ? (
          <ItemMainInfo
            categoryList={categoryList}
            manufactorList={manufactorList}
            storeList={storeList}
            updateMainInfo={updateMainInfo}
          ></ItemMainInfo>
        ) : (
          ""
        )}
        <ItemExpire updateExpireInfo={updateExpireInfo}></ItemExpire>
        <ItemImage></ItemImage>
      </div>
      <div className="flex overflow-scroll gap-3 px-4 py-1  w-full">
        <ItemPackage
          setDefultPackage={setDefultPackage}
          updateItemPackageInfo={updateItemPackageInfo}
          onTextChange={onTextChange}
        ></ItemPackage>
        {packageNestedList && packageNestedList.length > 0 && (
          <RenderData
          onFillingChange={onFillingChange}
          pcakageFillingInside={pcakageFillingInside}
            purchasingPrice={purchasingPrice}
            defaultPackage={defaultPackage}
            setDefultPackage={setDefultPackage}
            numberOfDivs={numberOfDivs}
            setNumberOfDivs={setNumberOfDivs}
            data={packageNestedList}
            onUnactiveHande={onUnactiveHande}
          />
        )}
        {packageNestedList.map((empty, index) => (
          <ItemPackageEmpty></ItemPackageEmpty>
        ))}
      </div>
      <div className="flex gap-3 px-4 py-1 w-full">
        <ItemSecondryInfo
          updateSecondaryInfo={updateSecondaryInfo}
        ></ItemSecondryInfo>
        <ItemQrCode
          handeNewBarcode={() => {
            setGeneratedOrginBarcode(generateRandomId());
          }}
          generatedBarcode={generatedBarcode}
          orginBarcode={orginBarcode}
        ></ItemQrCode>
      </div>
      <NewItemFotter></NewItemFotter>
    </form>
  );
}

export default NewItem;
