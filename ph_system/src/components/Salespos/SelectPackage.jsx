import React from "react";

function SelectPackage(props) {
    const handleSubmit= ()=>{
        console.log("x")
    }
  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  w-1/2 h-1/2 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
        <div></div>
    </form>
  );
}

export default SelectPackage;
