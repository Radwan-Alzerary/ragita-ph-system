import React from "react";
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
import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Row({ row, handleProductRemove, handleProductInsideInvoiceChange }) {
  
  
  const calculateTotalCost = (row) => {
    const quantity = parseFloat(row.quantity) || 0;
    const price = parseFloat(row.purchasesPrice) || 0;
    const discount = parseFloat(row.purchasesDiscount) || 0;
    const gift = parseFloat(row.gift) || 0;
    const representativeGift = parseFloat(row.RepresentativeGift) || 0;
    let totalPrice = 0;
    let giftCount = 0;
    // Calculate total cost considering discounts and gifts
    totalPrice = quantity * price;
    const totalDiscount = totalPrice - discount;
    console.log(row.giftType);
    if (row.giftType === "قطعة") {
      console.log(gift + representativeGift);
      giftCount = gift + representativeGift;
    } else {
      giftCount = gift;
    }
    totalPrice = totalPrice - discount;
    let singleCost = 0;
    if (row.bounsPersentage > 0) {
      giftCount = Math.round(giftCount * ((100 - row.bounsPersentage) / 100));
      console.log(giftCount);

      singleCost = totalPrice / (quantity + giftCount);
    } else {
      singleCost = totalPrice / (quantity + giftCount);
    }
    return singleCost.toFixed(2);
  };



  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <a>{row?.id?.name?.tradeName ?? ""}</a>
        </TableCell>
        <TableCell align="center">
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              التعبئة
            </InputLabel>
            <NativeSelect
              defaultValue={row.storageType}
              onChange={(event) =>
                handleProductInsideInvoiceChange(
                  "storageType",
                  row.id._id,
                  event.target.value
                )
              }
            >
              {row?.id?.prices?.map((pkg, index) => (
                <option key={index} value={pkg.packaging._id}>
                  {pkg.packaging.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "quantity",
                row.id._id,
                event.target.value
              )
            }
            value={row.quantity}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "purchasesPrice",
                row.id._id,
                event.target.value
              )
            }
            value={row.purchasesPrice}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "purchasesDiscount",
                row.id._id,
                event.target.value
              )
            }
            value={row.purchasesDiscount}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "gift",
                row.id._id,
                event.target.value
              )
            }
            value={row.gift}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "RepresentativeGift",
                row.id._id,
                event.target.value
              )
            }
            value={row.RepresentativeGift}
          />
        </TableCell>
        <TableCell align="center">
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={row.giftType}
              onChange={(event) =>
                handleProductInsideInvoiceChange(
                  "giftType",
                  row.id._id,
                  event.target.value
                )
              }
            >
              <option value="قطعة">قطعة</option>
              <option value="نقدي">نقدي</option>
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "bounsPersentage",
                row.id._id,
                event.target.value
              )
            }
            value={row.bounsPersentage}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            type="date"
            onChange={(event) =>
              handleProductInsideInvoiceChange(
                "expireDate",
                row.id._id,
                event.target.value
              )
            }
            value={formatDate(row.expireDate)}
          />
        </TableCell>
        <TableCell align="center">{calculateTotalCost(row)}</TableCell>
        <TableCell align="center">
          {row.quantity * row.purchasesPrice}
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={() => handleProductRemove(row._id)}>
            <DeleteOutlineIcon className="text-red-500" />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PurchasesNewList({
  purchasesInvoice,
  handleProductRemove,
  handleProductInsideInvoiceChange,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>اسم المنتج</TableCell>
            <TableCell align="center">التعبئة</TableCell>
            <TableCell align="center">الكمية</TableCell>
            <TableCell align="center">سعر الوحدة</TableCell>
            <TableCell align="center">الخصم</TableCell>
            <TableCell align="center">هدية المزود</TableCell>
            <TableCell align="center">هدية المندوب</TableCell>
            <TableCell align="center">نوع هدية المندوب</TableCell>
            <TableCell align="center">البونس المراد تكسيرة</TableCell>
            <TableCell align="center">تاريخ انتهاء الصلاحية</TableCell>
            <TableCell align="center">تكلفة القطعة الواحدة</TableCell>
            <TableCell align="center">اجمالي التكلفة الكلية</TableCell>
            <TableCell align="center">الخيارات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchasesInvoice.product?.map((row) => (
            <Row
              key={row._id}
              row={row}
              handleProductRemove={handleProductRemove}
              handleProductInsideInvoiceChange={
                handleProductInsideInvoiceChange
              }
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
