import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

function AddCategoryForm(props) {
  const [categoryName, setCategoryName] = useState(""); // Step 1
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000

  // Step 2: Set the initial value of categoryName when editing
  useEffect(() => {
    if (props.editing) {
      setCategoryName(props.initialCategoryName);
    }
  }, [props.editing, props.initialCategoryName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (props.editing) {
        // Editing an existing category
        response = await axios.patch(`${serverAddress}/categories/edit/${props.categoryId}`, {
          name: categoryName,
        });
        props.onEdit(response.data);

      } else {
        // Adding a new category
        response = await axios.post(`${serverAddress}/categories/newcategory`, {
          name: categoryName,
        });
        props.onAdd(response.data);

      }

      // Handle success, e.g., show a success message or update the categories list
      console.log(props.editing ? "Category edited:" : "New category added:", response.data);

      // Call the onAdd function with the new category data

      // Clear the form or perform any other necessary actions
      // ...
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error(props.editing ? "Error editing category:" : "Error adding category:", error);
    }
  };

  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
      <TextField
        label="اسم المجموعة"
        sx={{
          width: "100%", // Set the width to 100% for full-width
          direction: "rtl",
          textAlign: "right",
        }}
        value={categoryName} // Step 1: Bind the input field value to categoryName
        onChange={(e) => setCategoryName(e.target.value)} // Step 1: Update categoryName when input changes
      ></TextField>
      <Button type="submit" variant="contained" color="primary">
        {props.editing ? "تحديث" : "اضافة"} {/* Step 3: Modify button text */}
      </Button>
    </form>
  );
}

export default AddCategoryForm;
