import React from "react";
import Newitemautoinput from "../Additem/Newitemselector";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

function EditMainInfo(props) {
  // State variables to store form data
  const [name, setName] = useState({
    scientificName: props.editingProduct.name.scientificName,
    tradeName: props.editingProduct.name.tradeName,
    anotherName: props.editingProduct.name.anotherName,
  });
  const [specialCode, setSpecialCode] = useState("");

  // Function to handle changes in the name fields
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
    <div className=" w-3/5 h-full bg-white shadow rounded-xl flex flex-col justify-center px-4 items-center ">
      <div>
        <TextField
          label="Scientific Name"
          name="scientificName"
          value={name.scientificName}
          onChange={handleNameChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="Trade Name"
          name="tradeName"
          value={name.tradeName}
          onChange={handleNameChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="Another Name"
          name="anotherName"
          value={name.anotherName}
          onChange={handleNameChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="Special Code"
          name="specialCode"
          value={specialCode}
          onChange={handleSpecialCodeChange}
          variant="outlined"
        />
      </div>
    </div>
  );
}
export default EditMainInfo;
