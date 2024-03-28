import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ItemInTable from "../../../components/Storgecomponents/overAll/ItemInTable";

export default function Item(props) {
  return (
    <div className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>الاسم العلمي</TableCell>
              <TableCell align="right">الاسم التجاري</TableCell>
              <TableCell align="right">اخر تكلفة</TableCell>
              <TableCell align="right">التعبئة الافتراضية</TableCell>
              <TableCell align="right">سعر البيع</TableCell>
              <TableCell align="right">المتبقي</TableCell>
              <TableCell align="right">الصلاحية</TableCell>
              <TableCell align="right">الخيارات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.product.map((row) => (
              <ItemInTable row={row}></ItemInTable>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
