import React, { useEffect, useState } from "react";

function InvoiceViewTable(props) {
    const [finalPrice, setFinalPrice] = useState(0);
    const [finalQuantity, setFinalQuantity] = useState(0);
    useEffect(() => {
        const totalQuantity = props.invoices.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = props.invoices.reduce(
          (sum, product) => sum + product.quantity * product.price,
          0
        );
        setFinalQuantity(totalQuantity);
        setFinalPrice(totalPrice);
      }, [props.invoices]);
    
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-scroll ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 rounded-s-lg">
            اسم المنتج
          </th>
          <th scope="col" className="px-6 py-3 rounded-e-lg">
            السعر
          </th>

          <th scope="col" className="px-6 py-3">
            الكمية
          </th>
          <th scope="col" className="px-6 py-3 rounded-e-lg">
            السعر النهائي
          </th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((product) => (
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium flex gap-2 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <p>{product.id.name.tradeName}</p>

              <p className=" text-green-600">
                ({product.id.name.scientificName})
              </p>
            </th>
            <td className="px-6 py-4">{product.price}</td>
            <td className="px-6 py-4">{product.quantity}</td>
            <td className="px-6 py-4">{product.quantity * product.price}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="font-semibold text-gray-900 dark:text-white">
          <th scope="row" className="px-6 py-3 text-base">
            المجموع
          </th>

          <td className="px-6 py-3"></td>
          <td className="px-6 py-3">{finalQuantity}</td>

          <td className="px-6 py-3">{finalPrice}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default InvoiceViewTable;
