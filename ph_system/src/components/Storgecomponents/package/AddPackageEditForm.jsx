import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AddPackageEditForm = (props) => {
  const [packageName, setPackageName] = useState(""); // Step 1
  const [packageFilling, setPackageFilling] = useState(""); // Step 1
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000

  // Step 2: Set the initial value of categoryName when editing
  useEffect(() => {});
  useEffect(() => {
    if (props.editing) {
      setPackageName(props.packageData.name);
      setPackageFilling(props.packageData.fillings);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (props.addNested) {
        response = await axios.patch(
          `${serverAddress}/packages/newnested/${props.packageId}`,
          {
            name: packageName,
            fillings: packageFilling,
          }
        );
        props.onAdd();
      } else {
        if (props.editing) {
          // Editing an existing category
          response = await axios.patch(
            `${serverAddress}/packages/edit/${props.packageData._id}`,
            {
              name: packageName,
            }
          );
          props.onEdit(response.data);
        } else {
          // Adding a new category
          response = await axios.post(`${serverAddress}/packages/new`, {
            name: packageName,
          });
          props.onAdd(response.data);
        }
      }
      // Handle success, e.g., show a success message or update the categories list
      console.log(
        props.editing ? "Category edited:" : "New category added:",
        response.data
      );
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error(
        props.editing ? "Error editing category:" : "Error adding category:",
        error
      );
    }
  };

  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
      <TextField
        required
        label="اسم المجموعة"
        sx={{
          width: "100%", // Set the width to 100% for full-width
          direction: "rtl",
          textAlign: "right",
        }}
        value={packageName} // Step 1: Bind the input field value to categoryName
        onChange={(e) => setPackageName(e.target.value)} // Step 1: Update categoryName when input changes
      ></TextField>
      {props.addNested ? (
        <TextField
          required
          label="عدد التعبئات"
          sx={{
            width: "100%", // Set the width to 100% for full-width
            direction: "rtl",
            textAlign: "right",
          }}
          value={packageFilling} // Step 1: Bind the input field value to categoryName
          onChange={(e) => setPackageFilling(e.target.value)} // Step 1: Update categoryName when input changes
        ></TextField>
      ) : null}
      <Button type="submit" variant="contained" color="primary">
        تعديل
      </Button>
    </form>
  );
};

export default AddPackageEditForm;
