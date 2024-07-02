import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InvoiceViewTable from "./InvoiceViewTable";

function InvoiceView(props) {
  const [screenSelect, setScreenSelect] = useState("currentInvoice");
  console.log(props.invoiceViewData.oldInvoice);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <form
      className="fixed flex flex-col  left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center  overflow-scroll w-2/3 h-2/3 bg-white p-5 rounded-xl z-50"
      style={{ direction: "ltr" }}
    >
      <div className="flex  w-full gap-3">
        <Button
          style={{ width: "100%" }}
          variant={`${
            screenSelect === "editInvoice" ? "contained" : "outlined"
          }`}
          onClick={() => {
            setScreenSelect("editInvoice");
          }}
        >
          التعديلات
        </Button>
        <Button
          style={{ width: "100%" }}
          variant={`${
            screenSelect === "currentInvoice" ? "contained" : "outlined"
          }`}
          onClick={() => {
            setScreenSelect("currentInvoice");
          }}
        >
          الفاتورة الحالية
        </Button>
      </div>
      {screenSelect === "currentInvoice" ? (
        <InvoiceViewTable
          invoices={props.invoiceViewData.product}
        ></InvoiceViewTable>
      ) : (
        ""
      )}
      {screenSelect === "editInvoice" ? (
        <div className="flex flex-col gap-4 w-full">
          {props.invoiceViewData.oldInvoice.map((invoice) => (
            <div className="w-full">
              <div
                onClick={() => {
                  console.log(invoice.id);
                }}
                className="flex w-full h-12 justify-center items-center hover:bg-slate-100 cursor-pointer bg-slate-50 rounded-lg shadow"
              >
                {formatDate(invoice.editDate)}
              </div>
              <InvoiceViewTable
                invoices={invoice.id.product}
              ></InvoiceViewTable>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </form>
  );
}

export default InvoiceView;
