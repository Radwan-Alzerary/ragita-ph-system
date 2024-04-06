import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PurchasesInput from "./PurchasesInput";
import { PurchasesAutoComplet } from "./PurchasesAutoComplet";
import { Autocomplete, TextField } from "@mui/material";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const storageSelectorData = ["مخزن 1", "مخزن ادوية"];

  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {/* {row.name} */}
          <a>{row.id.name.tradeName}</a>
        </TableCell>
        <TableCell align="center">
          <TextField size="small" onChange={(event)=>props.handleProductInsideInvoiceChange("quantity",row.id._id,event.target.value)}  value={row.quantity}></TextField>
        </TableCell>
        <TableCell align="center">
          <TextField size="small"  onChange={(event)=>props.handleProductInsideInvoiceChange("purchasesPrice",row.id._id,event.target.value)}    value={row.purchasesPrice}></TextField>
        </TableCell>
        <TableCell align="center">
          <TextField size="small"  onChange={(event)=>props.handleProductInsideInvoiceChange("purchasesDiscount",row.id._id,event.target.value)}   value={row.purchasesDiscount}></TextField>
        </TableCell>
        <TableCell align="center">
          <TextField size="small"  onChange={(event)=>props.handleProductInsideInvoiceChange("gift",row.id._id,event.target.value)}   value={row.gift}></TextField>
        </TableCell>
        <TableCell align="center">
          <TextField size="small"  onChange={(event)=>props.handleProductInsideInvoiceChange("RepresentativeGift",row.id._id,event.target.value)}   value={row.RepresentativeGift}></TextField>
        </TableCell>
        <TableCell align="center">
          <TextField size="small"  onChange={(event)=>props.handleProductInsideInvoiceChange("bounsPersentage",row.id._id,event.target.value)}   value={row.bounsPersentage}></TextField>
        </TableCell>
        <TableCell align="center">
        <TableCell align="center">{row.quantity*row.purchasesPrice}</TableCell>

        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PurchasesNewList(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>اسم المنتج</TableCell>
            <TableCell align="center">الكمية</TableCell>
            <TableCell align="center">سعر الوحدة</TableCell>
            <TableCell align="center">الخصم</TableCell>
            <TableCell align="center">الهدايا</TableCell>
            <TableCell align="center">هدية المندوب</TableCell>
            <TableCell align="center">البونس المراد تكسيرة</TableCell>
            <TableCell align="center">اجمالي التكلفة</TableCell>
            <TableCell align="center">الخيارات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.purchasesInvoice.product?.map((row) => (
            <Row key={row._id} row={row} handleProductInsideInvoiceChange={props.handleProductInsideInvoiceChange}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
