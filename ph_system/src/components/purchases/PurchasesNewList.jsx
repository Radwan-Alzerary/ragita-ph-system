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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/* {row.name} */}
          <PurchasesAutoComplet
            width={120}
            
            data={storageSelectorData}
            freeSolo={false}
            defaultSelector={[storageSelectorData[0]]}
          ></PurchasesAutoComplet>
        </TableCell>
        <TableCell align="center">
          <PurchasesInput  width={60}></PurchasesInput>
        </TableCell>
        <TableCell align="center">
          <PurchasesInput  width={60}></PurchasesInput>
        </TableCell>
        <TableCell align="center">
          <PurchasesAutoComplet
            width={120}
            
            data={storageSelectorData}
            freeSolo={false}
            defaultSelector={[storageSelectorData[0]]}
          ></PurchasesAutoComplet>
        </TableCell>
        <TableCell align="center">
          <PurchasesInput  width={70}></PurchasesInput>
        </TableCell>
        <TableCell align="center">
          <PurchasesInput  width={50}></PurchasesInput>
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">
          {" "}
          <PurchasesInput  width={50}></PurchasesInput>
        </TableCell>
        <TableCell align="center">
          <PurchasesInput
            
            width={120}
          ></PurchasesInput>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function PurchasesNewList() {
  return (
    <TableContainer  component={Paper}>
      <Table aria-label="collapsible table" sx={{ minWidth: 650 }} size="small" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>اسم المنتج</TableCell>
            <TableCell align="center">الكمية</TableCell>
            <TableCell align="center">المسترجع</TableCell>
            <TableCell align="center">نوع التعبئة</TableCell>
            <TableCell align="center">سعر الشراء</TableCell>
            <TableCell align="center">الخصم</TableCell>
            <TableCell align="center">اجمالي التكلفة</TableCell>
            <TableCell align="center">في المخزن&nbsp;(g)</TableCell>
            <TableCell align="center">الهدايا&nbsp;(g)</TableCell>
            <TableCell align="center">البونس المراد تكسيرة&nbsp;(g)</TableCell>
            <TableCell align="center">الخيارات&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
