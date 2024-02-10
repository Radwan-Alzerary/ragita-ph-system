import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StorgeList from "../../../components/Storgecomponents/storges/StorgeList";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Storages() {
  const [storgesList, setStorgesList] = useState([]);
  useEffect(() => {
    console.log("");
    axios
      .get("http://localhost:5000/storges/getall")
      .then((response) => {
        setStorgesList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  return (
    <div className="w-full h-full flex justify-center gap-10 items-center relative">
      <div className="w-full h-full flex justify-center gap-10 items-center">
        {storgesList.map((storge) => (
          <StorgeList
            key={storge._id} // Make sure to use a unique key for each item
            id={storge._id}
            name={storge.name}
            defult={storge.defult}
            // onEdit={() => handleEditCategory(category.id)}
          ></StorgeList>
        ))}

      </div>
      <div className="h-24 w-24 bg-white flex justify-center items-center rounded-full absolute bottom-8 left-8 shadow hover:opacity-75 cursor-pointer">
        <AddIcon className=" text-green-600" sx={{ fontSize: 80 }}></AddIcon>
      </div>
    </div>
  );
}

export default Storages;
