import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function EditCategoryForm(props) {
    
  const [categoryName, setCategoryName] = useState(""); // Step 1
  useEffect(() => {
    setCategoryName(props.name)
  }, [props.name]);

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
        value={categoryName} 
        onChange={(e) => setCategoryName(e.target.value)} // Step 1: Update categoryName when input changes
      ></TextField>
      <Button type="submit" variant="contained" color="primary">
        تعديل
      </Button>
    </form>
  );
}

export default EditCategoryForm;
