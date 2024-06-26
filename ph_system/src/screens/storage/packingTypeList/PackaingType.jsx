import React from "react";
import { useState } from "react";
import BackroundShadow from "../../../components/pageCompond/BackroundShadow";
import AddPackageEditForm from "../../../components/Storgecomponents/package/AddPackageEditForm";
import { useEffect } from "react";
import axios from "axios";
import NestedList from "../../../components/Storgecomponents/package/NestedList";

const PackaingType = () => {
  const [packageList, setPackageList] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showNestedPackageForm, setShowNestedPackageForm] = useState(false);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showEditPackage, setShowEditPackage] = useState(false);
  const deleteHandle = (packageId) => {
    // Send a DELETE request to the server to delete the category by ID
    axios
      .delete(`${serverAddress}/packages/delete/${packageId}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(`Category with ID ${packageId} has been deleted.`);
        fetchData();
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${packageId}:`, error);
      });
  };
  const editHandle = (packageId) => {

    axios
    .get(`${serverAddress}/packages/getPackage/${packageId}`)
    .then((response) => {
      setSelectedPackage(response.data);
      setShowEditPackage(true);
    })
    .catch((error) => {
      console.error("Error fetching package by ID:", error);
    });

  };
  const addNestedHandle = (packageId) => {
    console.log(`Adding a nested package to package with ID: ${packageId}`);
    setPackageId(packageId);
    setShowNestedPackageForm(true);
  };

  useEffect(() => {
    axios
      .get(`${serverAddress}/packages/getall`)
      .then((response) => {
        setPackageList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const fetchData = () => {
    axios
      .get(`${serverAddress}/packages/getall`)
      .then((response) => {
        setPackageList(response.data);
        console.log(response.data);
        setShowPackageForm(false);
        setShowEditPackage(false)
        setShowNestedPackageForm(false);    
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const hideAddPackageForm = () => {
    console.log("x");
    setShowPackageForm(false);
    setShowEditPackage(false)
    setShowNestedPackageForm(false);
  };

  const showAddPackageForm = () => {
    setShowPackageForm(true);
  };
  return (
    <div className="px-4 overflow-y-scroll h-[92vh]">
      {showPackageForm ? (
        <>
          <BackroundShadow onClick={hideAddPackageForm}></BackroundShadow>
          <AddPackageEditForm
            onEdit={fetchData}
            onAdd={fetchData}
            editing={false}
          ></AddPackageEditForm>
        </>
      ) : null}
      {showEditPackage ? (
        <>
          <BackroundShadow onClick={hideAddPackageForm}></BackroundShadow>
          <AddPackageEditForm
            onEdit={fetchData}
            onAdd={fetchData}
            packageData={selectedPackage}
            editing={true}
          ></AddPackageEditForm>
        </>
      ) : null}

      {showNestedPackageForm ? (
        <>
          <BackroundShadow onClick={hideAddPackageForm}></BackroundShadow>
          <AddPackageEditForm
            onEdit={fetchData}
            onAdd={fetchData}
            addNested={true}
            packageId={packageId}
          ></AddPackageEditForm>
        </>
      ) : null}

      <div className="p-4 text-lg font-medium">
        <h1>انواع التعبئة</h1>
      </div>
      <NestedList
        onDelete={deleteHandle}
        onEdit={editHandle}
        onAddNested={addNestedHandle}
        data={packageList}
      />
      <div
        onClick={showAddPackageForm}
        className="w-full h-12 bg-green-300 p-4 flex justify-center rounded-lg cursor-pointer hover:bg-green-200 items-center"
      >
        <p>اضافة تعبئة</p>
      </div>
    </div>
  );
};

export default PackaingType;
