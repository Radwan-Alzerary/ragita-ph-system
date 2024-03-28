import React, { useEffect, useState } from "react";
import Newitemautoinput from "./Newitemautoinput";

function ItemSecondryInfo(props) {
  const [generalInformation, setGeneralInformation] = useState("");
  const [medicalInformation, setMedicalInformation] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [numberOfDoses, setNumberOfDoses] = useState(""); // Assuming it's a number
  const [comments, setComments] = useState("");
  useEffect(() => {
    props.updateSecondaryInfo(generalInformation, medicalInformation, sideEffects, numberOfDoses, comments);
  }, [generalInformation, medicalInformation, sideEffects, numberOfDoses, comments]);

  return (
    <div className="  w-4/5 h-28 bg-white shadow rounded-lg  items-center flex  gap-4  p-4">
      <Newitemautoinput
        width={200}
        title={"مواصفات مميزة"}
        value={generalInformation}
        setValue={setGeneralInformation}
      ></Newitemautoinput>
      <Newitemautoinput
        width={150}
        title={"مواصفات طبية"}
        value={medicalInformation}
        setValue={setMedicalInformation}
      ></Newitemautoinput>
      <Newitemautoinput
        width={150}
        title={"اعراض جانبية"}
        value={sideEffects}
        setValue={setSideEffects}
      ></Newitemautoinput>
      <Newitemautoinput
        width={100}
        title={"الجرع"}
        value={numberOfDoses}
        setValue={setNumberOfDoses}
      ></Newitemautoinput>
      <Newitemautoinput
        width={200}
        title={"ملاحضة"}
        value={comments}
        setValue={setComments}
      ></Newitemautoinput>
    </div>
  );
}

export default ItemSecondryInfo;
