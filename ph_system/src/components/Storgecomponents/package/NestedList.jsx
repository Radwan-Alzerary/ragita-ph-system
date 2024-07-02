import { useEffect } from "react";
import ListItem from "./ListItem";

const NestedList = ({ data, level = 0, onDelete, onEdit, onAddNested }) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div style={{ paddingRight: `${level * 10}px` }}>
      {data.map((item, index) =>
        item.active ? (
          <ListItem
            key={index}
            item={item}
            level={level}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddNested={onAddNested}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default NestedList;
