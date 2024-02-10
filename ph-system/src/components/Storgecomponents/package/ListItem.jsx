import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import LoupeIcon from "@mui/icons-material/Loupe";
import NestedList from "./NestedList";

const ListItem = ({ item, level, onDelete, onAddNested, onEdit }) => {
  const containerStyle = {
    paddingRight: `${level * 10}px`,
    // padding: '10px',
  };
console.log(item)
  if (item.children && item.children.length > 0) {
    console.log(item.name);
    return (
      <div style={containerStyle} className="">
        <div className=" bg-white h-12 rounded-lg mb-3 flex justify-between px-4 items-center">
          <div> {item.name}</div>
          <div> {item.fillings}</div>
          <div className="w-1/3 flex text-left justify-end gap-3">
            <div
              onClick={() => onAddNested(item.id)} // Wrap onAddNested in an arrow function
              className="w-10 h-10 rounded-full bg-green-400 cursor-pointer hover:bg-green-300 flex justify-center items-center"
            >
              <LoupeIcon></LoupeIcon>
            </div>

            <div onClick={() => onDelete(item.id)}  className="w-10 h-10 rounded-full bg-red-400 cursor-pointer hover:bg-red-300 flex justify-center items-center">
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </div>
            <div onClick={() => onEdit(item.id)} className="w-10 h-10 rounded-full bg-blue-400 cursor-pointer hover:bg-blue-300 flex justify-center items-center">
              <CreateIcon></CreateIcon>
            </div>
          </div>
        </div>
        <NestedList
          data={item.children}
          onDelete={onDelete}
          onEdit={onEdit}
          onAddNested={onAddNested}
          level={level + 1}
        />
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <div className=" bg-white h-12 rounded-lg mb-3 flex justify-between px-4 items-center">
          <div> {item.name}</div>
          <div> {item.fillings}</div>
          <div className="w-1/3 flex text-left justify-end gap-3">
            <div onClick={() => onAddNested(item.id)} className="w-10 h-10 rounded-full bg-green-400 cursor-pointer hover:bg-green-300 flex justify-center items-center">
              <LoupeIcon></LoupeIcon>
            </div>

            <div onClick={() => onDelete(item.id)} className="w-10 h-10 rounded-full bg-red-400 cursor-pointer hover:bg-red-300 flex justify-center items-center">
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </div>
            <div onClick={() => onEdit(item.id)} className="w-10 h-10 rounded-full bg-blue-400 cursor-pointer hover:bg-blue-300 flex justify-center items-center">
              <CreateIcon></CreateIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default ListItem;
