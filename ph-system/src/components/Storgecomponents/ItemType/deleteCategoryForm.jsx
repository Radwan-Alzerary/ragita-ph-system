import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function EditCategoryForm(props) {
  const handleDeleteCategory = (categoryId) => {
    // Send a DELETE request to the server to delete the category by ID
    axios
      .delete(`http://localhost:5000/categories/delete/${categoryId}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(`Category with ID ${categoryId} has been deleted.`);

        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${categoryId}:`, error);
      });
  };

  const [categoryName, setCategoryName] = useState(""); // Step 1
  useEffect(() => {
    setCategoryName(props.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        تعديل
      </Button>
    </form>
  );
}

export default EditCategoryForm;
