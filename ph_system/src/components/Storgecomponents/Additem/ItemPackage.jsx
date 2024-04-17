import React, { useEffect, useState } from "react";
import Newitemselector from "./Newitemselector";
import Newitemautoinput from "./Newitemautoinput";
import axios from "axios";

function ItemPackage(props) {
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000

  const [StorgeList, setStorgeList] = useState([]);
  useEffect(() => {
    axios
      .get(`${serverAddress}/packages/getnamelist`)
      .then((response) => {
        const namesArray = response.data.map((item) => item.name);
        console.log(namesArray);
        setStorgeList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const [purchasingPrice, setPurchasingPrice] = useState("");
  const [lessamount, setLessamount] = useState("");
  const [rackNumber, setRackNumber] = useState("");

  useEffect(() => {
    props.updateItemPackageInfo(purchasingPrice, lessamount, rackNumber);
  }, [purchasingPrice, lessamount, rackNumber]);

  return (
    <div className=" w-1/5 h-72 bg-white shadow rounded-lg flex flex-col gap-4 justify-center p-4">
      <h6 className=" text-right">التعبئة الرئيسية</h6>
      {/* <Autocomplete
          id="country-select-demo"
          sx={{ width: "25%" }}
          options={props.manufactorList}
          size="small"
          autoHighlight
          freeSolo
          onChange={(event, newValue) => {

          }}
          onInputChange={(event, newInputValue) => {
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="الشركة المصنعة"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        /> */}
      <Newitemselector
        width={"full"}
        title={"نوع التعبئة"}
        data={StorgeList}
        freeSolo={false}
        onTextChange={props.onTextChange}
        defaultSelector={[StorgeList[0]]}
      ></Newitemselector>
      <Newitemautoinput
        setValue={setPurchasingPrice}
        required={true}

        width={"full"}
        title={"سعر الشراء"}
        type={"number"}
      ></Newitemautoinput>
      <Newitemautoinput
        setValue={setLessamount}
        width={"full"}
        title={"الحد الادنى"}
        type={"number"}
      ></Newitemautoinput>
      <Newitemautoinput
        setValue={setRackNumber}
        width={"full"}
        title={"رقم الرف"}
        type={"number"}

      ></Newitemautoinput>
    </div>
  );
}

export default ItemPackage;
