import { TextField } from "@mui/material";
import React from "react";

function Newitemautoinput(props) {
  const handleChange = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <TextField
    label={props.title}
    required = {props.required}
      size="small"
      sx={{
        width: props.width,
        direction: "rtl",
        textAlign: "right",
      }}
      type={props.type}
      value={props.value}
      onChange={handleChange}

    ></TextField>
  );
}

export default Newitemautoinput;
