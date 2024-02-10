import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function Newitemselector(props) {
  const [selectedValue, setSelectedValue] = useState(null);

  // Use useEffect to update selectedValue when props.data changes
  useEffect(() => {
    if (props.data.length > 0) {
      // setSelectedValue(props.data[0]);
    }
  }, [props.data]);

  const handleChange = (event, newValue) => {
    if (typeof newValue !== "undefined") {
      setSelectedValue(newValue);
      // Your other logic here, if needed
    }

    if (event === "freeSolo" && props.freeSolo) {
      props.onTextChange("freeSolo", newValue);
    } else {
      if (newValue) {
        const selectedId = newValue._id;
        const selectedName = newValue.name;
        props.onTextChange(selectedId, selectedName);
      }
    }
  };

  return (
    <div className="my-1">
      <Autocomplete
        disablePortal
        id="size-small-outlined"
        options={props.data}
        size="small"
        freeSolo={props.freeSolo}
        getOptionLabel={(option) => {
          if (typeof option.name !== "undefined") {
            return option.name;
          }
          // If option.name is undefined, return an empty string or selectedValue
          return selectedValue;
        }}
        onChange={handleChange}
        value={selectedValue}
        inputValue={props.autoCompeteInputValue}
        onInputChange={(event, newInputValue) => {
          handleChange(null, newInputValue);
        }}
        sx={{
          width: props.width,
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label={props.title}
            placeholder={props.title}
          />
        )}
      />
    </div>
  );
}

export default Newitemselector;
