import { TableCell, TableRow } from "@mui/material";
import React from "react";

function ItemInTable({ row }) {
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
      <TableCell component="th" scope="row">
        {row.name.scientificName ? row.name.scientificName : ""}
      </TableCell>
      <TableCell align="right">
        {row.name.tradeName ? row.name.tradeName : ""}
      </TableCell>
      <TableCell align="right">{row.purchasingPrice}</TableCell>
      <TableCell align="right">
        {" "}
        {price && price.packaging.name ? price.packaging.name : ""}
      </TableCell>
      <TableCell align="right">
        {price && price.singlePrice ? price.singlePrice : ""} دع{" "}
      </TableCell>
      <TableCell align="right">
        {" "}
        {price && price.quantity ? price.quantity : ""}
      </TableCell>

      <TableCell align="right">{row.expireDate}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
  );
}

export default ItemInTable;
