import { Delete, Edit } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import React from "react";

function ItemInTable({ row, onDeleteHandle,onEditHandle }) {
  const price = row.prices.find((element) =>
    element.packaging && element.packaging._id
      ? element.packaging._id
      : "" === row.defaultPackaging
  );

  return (
    <TableRow
      key={row._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell  align="center">
        {row.name.tradeName ? row.name.tradeName : ""}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {row.name.scientificName ? row.name.scientificName : ""}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {row.manufactor ? row.manufactor.name : ""}
      </TableCell>

      <TableCell align="center" component="th" scope="row">
        {row.countery ? row.countery.name : ""}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {row.defaultPackaging ? row.defaultPackaging.name : ""}
      </TableCell>


      <TableCell align="center">{row.purchasingPrice} دع</TableCell>
      <TableCell align="center">
        {price && price.singlePrice ? price.singlePrice : ""} دع{" "}
      </TableCell>
      <TableCell align="center">
        {" "}
        {price && price.quantity ? price.quantity : ""}
      </TableCell>

      <TableCell align="center">{row.expireDate}</TableCell>
      <TableCell align="center" className="text-red-500 cursor-pointer">
        <div
          onClick={() => {
            onDeleteHandle(row._id);
          }}
        >
          <Delete></Delete>
        </div>
      </TableCell>
      <TableCell align="center" className="text-blue-500 cursor-pointer">
        <div
          onClick={() => {
            onEditHandle(row._id);
          }}
        >
          <Edit></Edit>
        </div>
      </TableCell>

    </TableRow>
  );
}

export default ItemInTable;
