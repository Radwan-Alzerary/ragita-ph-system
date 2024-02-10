import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

export const SalesPosSelectors = (props) => {
  const handleChange = (event, newValue) => {
    if (newValue) {
      const selectedId = newValue._id;
      const selectedName = newValue.name;
      props.onTextChange(selectedId, selectedName);
    }
  };

  return (
    <div className="my-1">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.data}
        size="xs"
        freeSolo= {props.freeSolo}
        // defaultValue={props.defaultSelector}
        getOptionLabel={(option) => option.name}
        onChange={(_, newValue) => {
          handleChange(_, newValue);
        }}

        sx={{ width: props.width, direction: "rtl", textAlign: "right", color: "#fff" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.title}
            variant="standard"
            color="warning"
          />
        )}
      />
    </div>
  );
};

