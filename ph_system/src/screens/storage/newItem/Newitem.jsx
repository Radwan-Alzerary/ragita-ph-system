import React, { useCallback, useEffect, useRef } from "react";
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
import PrintingQr from "../../../components/Storgecomponents/Additem/PrintingQr";
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
    totallPackageInside
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
  const [prints, setprints] = useState(false);
  const [dataToPrint, setDataToPrint] = useState([]);

  const [OutfittersList, setOutfittersList] = useState([]);
  const [manufactorList, setManufactorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unActivePackage, setUnActivePackage] = useState([]);
  const [pcakageFillingInside, setPackageFillingInside] = useState();
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000

  const onFillingChange = (id, value) => {
    console.log(id, value);
    axios
      .post(`${serverAddress}/packages/getPackageFillingForChild`, {
        id: id,
        fillingValue: value,
        currentPackage: packageNestedData,
      })
      .then((response) => {
        setPackageFillingInside(response.data.result.childFill);
        console.log("POST request successful:", response.data.result.childFill);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };
  const HandleonPrinterClick = () => {
    console.log(generatedBarcode);
    setDataToPrint(generatedBarcode); // Update the categories state with the fetched data
    handlePrint();
  };
  const handlePrint = () => {
    setprints(true);
  };
  const handlePrintFeedBack = () => {
    setprints(false);
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
    fetchDataFromApi(`${serverAddress}/storges/getall`, setStorgeList);
    fetchDataFromApi(
      `${serverAddress}/categories/getall`,
      setCategoryList
    );
    fetchDataFromApi(
      `${serverAddress}/outfitters/getall`,
      setOutfittersList
    );

    fetchDataFromApi(
      `${serverAddress}/manufactor/getall`,
      setManufactorList
    );
    setLoading(false);
  }, []);

  const barcodeRef = useRef("");
  const timeoutRef = useRef(null);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      if (barcodeRef.current !== "") {
        console.log("Barcode Scanned:", barcodeRef.current);
        setOrginBarcode(barcodeRef.current);
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
  }, [setOrginBarcode]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  const onTextChange = (selectedId, selectedName) => {
    console.log(selectedId);
    console.log(selectedName);
    dataToPush.mainPackage = selectedId;
    axios
      .get(`${serverAddress}/packages/getnested/${selectedId}`)
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
    dataToPush.firstOutfitters = data.firstOutfitters;
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
    console.log(dataToPush);
    event.preventDefault();
    // Make a single POST request with all the data
    axios
      .post(`${serverAddress}/products/add`, dataToPush)
      .then((response) => {
        console.log("POST request successful:", response.data);
        window.location.reload();
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
    <form className=" h-full relative flex flex-col" onSubmit={SubmintHandle}>
      <div className="flex flex-wrap w-full gap-6 px-4 py-1">
        {!loading && storeList.length !== 0 ? (
          <ItemMainInfo
            categoryList={categoryList}
            OutfittersList={OutfittersList}
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
      <div className="flex overflow-scroll gap-3  px-4 py-1  w-full">
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
      <div className="flex  gap-3 px-4 py-1 w-full">
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
      <div className="flex h-[10%]">
        <NewItemFotter printQr={HandleonPrinterClick}></NewItemFotter>
      </div>
      {prints ? (
        <>
          <PrintingQr
            prints={prints}
            dataToPrint={dataToPrint}
            feedback={handlePrintFeedBack}
            name={dataToPush.tradeName}
          ></PrintingQr>
        </>
      ) : (
        ""
      )}
    </form>
  );
}

export default NewItem;
