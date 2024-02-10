import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BackroundShadow from "../../pageCompond/BackroundShadow";
import EditCategoryForm from "./editCategoryForm";
import AddCategoryForm from "./AddCategoryForm";
function ItemCategory(props) {
  const [showEditCategoryForm, setEditShowCategoryForm] = useState(false);
  const hideAddCategoryForm = () => {
    setEditShowCategoryForm(!showEditCategoryForm);
  };
  const showAddCategoryForm = () => {
    setEditShowCategoryForm(!showEditCategoryForm);
  };

  useEffect(() => {
    console.log(props);
  }, []);
  
  return (
    <div className="w-full my-2 cursor-pointer" onClick={props.onClick}>
      {showEditCategoryForm ? (
        <>
          <BackroundShadow onClick={hideAddCategoryForm}></BackroundShadow>
          <AddCategoryForm editing={true} onEdit={props.onEdit}  categoryId={props.id} name={props.title}></AddCategoryForm>
        </>
      ) : null}

      <div className=" w-full h-12 flex bg-white hover:bg-slate-100 rounded-xl shadow px-4  items-center">
        <div className="w-1/3"></div>
        <div className="text-center text-lg font-bold w-1/3">{props.title}</div>
        <div className="w-1/3 flex text-left justify-end gap-3">
          <div onClick={props.onDelete}  className="w-10 h-10 rounded-full bg-red-400 cursor-pointer hover:bg-red-300 flex justify-center items-center">
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </div>
          <div onClick={showAddCategoryForm} className="w-10 h-10 rounded-full bg-blue-400 cursor-pointer hover:bg-blue-300 flex justify-center items-center">
            <CreateIcon></CreateIcon>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-400 cursor-pointer hover:bg-green-300 flex justify-center items-center">
            <ArrowDownwardIcon></ArrowDownwardIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCategory;
