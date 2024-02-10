import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

export const PurchasesAutoComplet = (props) => {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div className="my-1">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.data}
        size="small"
        freeSolo= {props.freeSolo}
        defaultValue={props.defaultSelector}
        sx={{ width: props.width, direction: "rtl", textAlign: "right", color: "#fff" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.title}
            variant="outlined" 
            color="warning"
          />
        )}
      />
    </div>
  );
};
