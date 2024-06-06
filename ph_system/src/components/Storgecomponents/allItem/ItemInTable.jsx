import { Delete, Edit, QrCode } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";

function ItemInTable({ row, onDeleteHandle, onEditHandle, printQr }) {
  const price = row.prices.find((element) =>
    element.packaging && element.packaging._id
      ? element.packaging._id
      : "" === row.defaultPackaging
  );
  function formatExpireHumanReadableDate(isoDate) {
    // Create a new Date object from the ISO 8601 string
    const date = new Date(isoDate);

    // Extract the parts of the date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1

    // Format the date and time in a human-readable format
    const humanReadableDate = `${month}/${year} `;

    return humanReadableDate;
  }

  return (
    <TableRow
      key={row._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">
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

      <TableCell align="center">
        {formatExpireHumanReadableDate(row.expireDate)}
      </TableCell>
      <TableCell align="center" className="text-red-500 cursor-pointer">
        <div
          onClick={() => {
            onDeleteHandle(row._id);
          }}
        >
          <IconButton>
            <Delete className="text-red-500"></Delete>
          </IconButton>
        </div>
      </TableCell>
      <TableCell align="center" className="text-blue-500 cursor-pointer">
        <div
          onClick={() => {
            onEditHandle(row._id);
          }}
        >
          <IconButton>
            <Edit className=" text-blue-500"></Edit>
          </IconButton>
        </div>
      </TableCell>
      <TableCell align="center" className="text-blue-500 cursor-pointer">
        <div
          onClick={() => {
            printQr(row._id);
          }}
        >
          <IconButton>
            <QrCode className=" text-green-600"></QrCode>
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ItemInTable;
