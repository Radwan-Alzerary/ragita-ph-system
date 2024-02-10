import { TextField } from "@mui/material";
import React from "react";

function PurchasesInput(props) {
  return (
    <TextField
    label={props.title}
      size="small"
      variant="outlined" 
      sx={{
        width: props.width,
        direction: "rtl",
        textAlign: "right",
      }}
    ></TextField>
  );
}

export default PurchasesInput;
