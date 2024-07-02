import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { green, red } from "@mui/material/colors";

function UserDebtCard(props) {
  const [fullDept, setFullDept] = useState(0);
  const [isPartialPaymentVisible, setIsPartialPaymentVisible] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);

  useEffect(() => {
    let sumInvoice = 0;
    props.dept.invoice.forEach((invo) => {
      if (invo.invoiceId) {
        sumInvoice += invo.invoiceId.finalprice - invo.invoiceId.amountPaid;
      }
    });
    setFullDept(sumInvoice);
  }, [props.dept.invoice]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  const handlePartialPaymentSubmit = () => {
    props.handelDeptPayment(props.dept._id, partialPaymentAmount);
    setIsPartialPaymentVisible(false); // Hide the form after submission
  };

  return (
    <div className="w-52 min-h-52 h-72 rounded-xl bg-white p-2 relative">
      <div>
        <p className="text-center text-lg font-bold m-0">{props.dept.name}</p>
        <p className="text-center text-base">{props.dept.phoneNumber}</p>
      </div>
      <hr></hr>

      <div>
        <p className="text-center text-4xl font-bold my-1 text-red-500">
          {fullDept}
        </p>
      </div>
      <hr></hr>

      <div className="relative h-28 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 mt-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="text-center">رقم الوصل</th>
              <th scope="col" className="text-center">المبلغ</th>
              <th scope="col" className="text-center">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {props.dept.invoice.map((invo) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={invo._id}>
                <td className="text-center text-xs">
                  {invo.invoiceId ? invo.invoiceId.number : ""}
                </td>
                <td className="text-center text-xs">
                  {invo.invoiceId ? (invo.invoiceId.finalprice - invo.invoiceId.amountPaid) : ""}
                </td>
                <td className="text-center text-xs">
                  {formatDate(invo.invoiceId ? invo.invoiceId.progressdate : "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full absolute bottom-0 border border-t-1 h-12 left-0 rounded flex justify-center items-center gap-4">
        <button
          type="button"
          onClick={() => props.handelDeptPayment(props.dept._id, fullDept)}
          className="bg-green-400 hover:bg-green-500 font-medium rounded text-sm px-5 py-2.5 text-center"
        >
          تسديد كامل
        </button>

        <button
          type="button"
          onClick={() => setIsPartialPaymentVisible(true)}
          className="bg-red-400 hover:bg-red-500 font-medium rounded text-sm px-5 py-2.5 text-center"
        >
          تسديد جزء
        </button>
      </div>

      {isPartialPaymentVisible && (
        <div className="absolute bottom-14 left-0 w-full p-2 bg-gray-100 rounded">
          <input
            type="number"
            value={partialPaymentAmount}
            onChange={(e) => setPartialPaymentAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="أدخل المبلغ"
          />
          <button
            type="button"
            onClick={handlePartialPaymentSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded text-sm px-5 py-2.5 text-center w-full"
          >
            تقديم
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDebtCard;
